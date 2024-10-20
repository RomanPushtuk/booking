import { Service } from "typedi";
import odbc from "odbc";

import { ODBC } from "../../ignite";
import { UserRepository } from "../repositories/UserRepository";
import { ClientRepository } from "../repositories/ClientRepository";
import { HostRepository } from "../repositories/HostRepository";
import { BookingRepository } from "../repositories/BookingRepository";

@Service()
export class UnitOfWorkService {
  private _trx: odbc.Connection | null = null;
  private _db: odbc.Connection;

  constructor() {
    this._db = ODBC.getConnection();
  }

  async makeTransactional<T>(
    cb: (trx: odbc.Connection) => Promise<T>,
  ): Promise<T> {
    this._trx = ODBC.getConnection();
    await this._trx.beginTransaction();
    const result = await cb(this._trx);
    await this._trx.commit();
    await this._trx.close();
    ODBC.returnConnection(this._trx);
    this._trx = null;
    return result;
  }

  get userRepository(): UserRepository {
    return new UserRepository(this._trx || this._db);
  }

  get clientRepository(): ClientRepository {
    return new ClientRepository(this._trx || this._db);
  }

  get bookingRepository(): BookingRepository {
    return new BookingRepository(this._trx || this._db);
  }

  get hostRepository(): HostRepository {
    return new HostRepository(this._trx || this._db);
  }
}
