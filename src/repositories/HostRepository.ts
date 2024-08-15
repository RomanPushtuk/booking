import { Inject, Service } from "typedi";
import * as knex from "knex";
import { Host } from "../domain/Host";
import { Id } from "../valueObjects/Id";
import { BookingRepository } from "./BookingRepository";
import { CreateHostDTO } from "../dtos/CreateHostDTO";

@Service()
export class HostRepository {
  constructor(
    private _db: knex.Knex,
    private _bookingRepository: BookingRepository,
  ) {}

  public async getAll(): Promise<Host[]> {
    const data = await this._db("hosts").select("*");
    const dtos = data.map(
      (item) =>
        new CreateHostDTO({
          ...item,
          workHours: JSON.parse(item.workHours),
          workDays: JSON.parse(item.workDays),
        }),
    );
    const hosts = dtos.map((dto) => Host.fromDTO(dto));
    return hosts;
  }

  public async getById(id: string): Promise<Host> {
    const hostData = await this._db("host").where({ id });
    const upcomingBookings = await this._bookingRepository.getAll();

    const createHostDTO = new CreateHostDTO(hostData);
    const host = Host.fromDTO(createHostDTO);

    host.setUpcomingBookings(upcomingBookings);

    return host;
  }

  public async save(host: Host): Promise<{ id: string }> {
    const hostProperties = host.getProperties();

    const upcomingBookings = host.getUpcomingBookings();

    await this._db("hosts")
      .insert({
        ...hostProperties,
        workHours: JSON.stringify(hostProperties.workHours),
        workDays: JSON.stringify(hostProperties.workDays),
      })
      .onConflict("id")
      .merge();

    await this._bookingRepository.saveAll(upcomingBookings);

    return { id: hostProperties.id };
  }
}
