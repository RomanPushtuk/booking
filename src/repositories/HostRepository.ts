import { Service } from "typedi";
import { Host } from "../domain/Host";
import { BookingRepository } from "./BookingRepository";
import { HostDTO } from "../dtos/HostDTO";
import { BookingFilters } from "../application/BookingFilters";
import moment from "moment";
import odbc from "odbc";

@Service()
export class HostRepository {
  private _bookingRepository: BookingRepository;

  constructor(private _db: odbc.Connection) {
    this._bookingRepository = new BookingRepository(_db);
  }

  public async getAll(): Promise<Host[]> {
    const hostsData = await this._db("hosts").select("*");
    const hostsPromises = hostsData.map(async (item) => {
      return this.getById(item.id);
    });
    const hosts = await Promise.all(hostsPromises);
    return hosts;
  }

  public async getById(id: string): Promise<Host> {
    const hostData = await this._db("hosts").where({ id }).first();

    const upcomingBookings = await this._bookingRepository.getAll(
      undefined,
      new BookingFilters({
        hostId: id,
        dateFrom: moment().format("YYYY-MM-DD"),
      }),
    );

    const createHostDTO = new HostDTO({
      ...hostData,
      workHours: JSON.parse(hostData.workHours),
      workDays: JSON.parse(hostData.workDays),
    });

    const host = Host.fromDTO(createHostDTO);

    host.setUpcomingBookings(upcomingBookings);

    return host;
  }

  public async save(host: Host): Promise<{ id: string }> {
    const { id, workHours, workDays, forwardBooking, deleted } =
      host.getProperties();

    const upcomingBookings = host.getUpcomingBookings();

    await this._db("hosts")
      .insert({
        id,
        forwardBooking,
        workHours: JSON.stringify(workHours),
        workDays: JSON.stringify(workDays),
        isDeleted: deleted,
      })
      .onConflict("id")
      .merge();

    await this._bookingRepository.saveAll(upcomingBookings);

    return { id: host.id.value };
  }
}
