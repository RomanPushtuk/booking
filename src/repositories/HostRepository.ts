import { Service } from "typedi";
import * as knex from "knex";
import { Host } from "../domain/Host";
import { BookingRepository } from "./BookingRepository";
import { HostDTO } from "../dtos/HostDTO";
import { BookingFilters } from "../application/BookingFilters";
import moment from "moment";

@Service()
export class HostRepository {
  constructor(
    private _db: knex.Knex,
    private _bookingRepository: BookingRepository
  ) {}

  public async getAll(): Promise<Host[]> {
    const hostsData = await this._db("hosts").select("*");
    const dtos = hostsData.map((item) => {
      const hostId = item.id;
      const upcomingBookings = await this._bookingRepository.getAll();

      return new HostDTO({
        ...item,
        workHours: JSON.parse(item.workHours),
        workDays: JSON.parse(item.workDays),
      });
    });
    const hosts = dtos.map((dto) => Host.fromDTO(dto));
    return hosts;
  }

  public async getById(id: string): Promise<Host> {
    const hostData = await this._db("hosts").where({ id }).first();

    const bookingFilters = new BookingFilters({
      hostId: id,
      dateFrom: moment().toISOString(),
    });

    const upcomingBookings = await this._bookingRepository.getAll(
      undefined,
      bookingFilters,
    );

    const createHostDTO = new HostDTO({
      ...hostData,
      upcomingBookings,
      workHours: JSON.parse(hostData.workHours),
      workDays: JSON.parse(hostData.workDays),
    });

    const host = Host.fromDTO(createHostDTO);
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
