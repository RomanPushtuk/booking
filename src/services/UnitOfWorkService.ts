import * as knex from "knex";
import { Service, Container } from "typedi";
import { db } from "../../db";
import { UserRepository } from "../repositories/UserRepository";
import { ClientRepository } from "../repositories/ClientRepository";
import { HostRepository } from "../repositories/HostRepository";
import { BookingRepository } from "../repositories/BookingRepository";

@Service()
export class UnitOfWorkService {
  private trx: knex.Knex.Transaction<any, any[]> | null;
  private resolve: (() => void) | null;

  constructor() {
    this.trx = null;
    this.resolve = null;
  }

  public makeTransactional<T>(cb: () => T): Promise<T> {
    return new Promise((resolve) => {
      db.transaction(async (trx) => {
        this.trx = trx;
        const res = await cb();
        resolve(res);
      });
    });
  }

  public async begin(): Promise<void> {
    return new Promise((resolve) => {
      db.transaction(async (trx) => {
        this.trx = trx;
        this.resolve = resolve;
      });
    });
  }

  get userRepository(): UserRepository {
    if (!this.trx) throw new Error("");
    return new UserRepository(this.trx);
  }

  get clientRepository(): ClientRepository {
    if (!this.trx) throw new Error("");
    return new ClientRepository(this.trx);
  }

  get bookingRepository(): BookingRepository {
    if (!this.trx) throw new Error("");
    return new BookingRepository(this.trx);
  }

  get hostRepository(): HostRepository {
    if (!this.trx) throw new Error("");
    const bookingRepository = this.bookingRepository;
    return new HostRepository(this.trx, bookingRepository);
  }
}
