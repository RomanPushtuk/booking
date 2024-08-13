import { Inject, Service } from "typedi";
import * as knex from "knex";
import { Host } from "../domain/Host";
import { Id } from "../valueObjects/Id";
import { BookingRepository } from "./BookingRepository";
import { CreateHostDTO } from "../dtos/CreateHostDTO";

@Service()
export class HostRepository {
  constructor(
    @Inject("db") private _db: knex.Knex,
    @Inject() private _bookingRepository: BookingRepository,
  ) {}

  public async getById(id: string): Promise<Host> {
    const hostData = await this._db("host").where({ id });
    const upcomingBookings = await this._bookingRepository.getAll();

    const createHostDTO = new CreateHostDTO(hostData);
    const host = Host.fromDTO(createHostDTO);

    host.setUpcomingBookings(upcomingBookings);

    return host;
  }

  public async save(host: Host): Promise<Id> {
    const hostDTO = host.getProperties();
    const upcomingBookings = host.getUpcomingBookings();

    await this._db("host").update({});
    this._bookingRepository.saveAll(upcomingBookings);

    return host.id;
  }
}
