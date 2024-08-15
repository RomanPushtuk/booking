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

  constructor() {
    this.trx = null;
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

  get userRepository(): UserRepository {
    return new UserRepository(this.trx || db);
  }

  get clientRepository(): ClientRepository {
    return new ClientRepository(this.trx || db);
  }

  get bookingRepository(): BookingRepository {
    return new BookingRepository(this.trx || db);
  }

  get hostRepository(): HostRepository {
    const bookingRepository = this.bookingRepository;
    return new HostRepository(this.trx || db, bookingRepository);
  }
}
