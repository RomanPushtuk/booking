import { Service } from "typedi";
import { Host } from "../domain/Host";
import { BookingRepository } from "./BookingRepository";
import { HostDTO } from "../dtos/HostDTO";
import { BookingFilters } from "../application/BookingFilters";
import moment from "moment";
import odbc from "odbc";
import { Ignite } from "../../ignite";
import { getAllHosts } from "../sql/getAllHosts";
import { getHostById } from "../sql/getHostById";
import { saveHost } from "../sql/saveHost";

@Service()
export class HostRepository {
  private _bookingRepository: BookingRepository;

  constructor(private _db: odbc.Connection) {
    this._bookingRepository = new BookingRepository();
  }

  public async getAll(): Promise<Host[]> {
    const sql = getAllHosts();
    const hostsData = await Ignite.query(sql);

    const hostsPromises = hostsData.map(async (item: any) => {
      return this.getById(item.ID);
    });
    const hosts = await Promise.all(hostsPromises);
    return hosts;
  }

  public async getById(id: string): Promise<Host> {
    const sql = getHostById({ id });
    const hostData: any = (await Ignite.query(sql))[0];

    const { ID, WORKHOURS, WORKDAYS, FORWARDBOOKING } = hostData;

    const upcomingBookings = await this._bookingRepository.getAll(
      undefined,
      new BookingFilters({
        hostId: id,
        dateTimeFrom: moment().format("YYYY-MM-DD HH:mm:ss"),
      }),
    );

    const createHostDTO = new HostDTO({
      id: ID,
      forwardBooking: FORWARDBOOKING,
      workHours: JSON.parse(WORKHOURS),
      workDays: JSON.parse(WORKDAYS),
    });

    const host = Host.fromDTO(createHostDTO);

    host.setUpcomingBookings(upcomingBookings);

    return host;
  }

  public async save(host: Host): Promise<{ id: string }> {
    const { id, workHours, workDays, forwardBooking, deleted } =
      host.getProperties();

    const upcomingBookings = host.getUpcomingBookings();
    const sql = saveHost({
      id,
      forwardBooking,
      workHours: JSON.stringify(workHours),
      workDays: JSON.stringify(workDays),
      isDeleted: deleted,
    });

    await Ignite.query(sql);

    await this._bookingRepository.saveAll(upcomingBookings);

    return { id: host.id.value };
  }
}
