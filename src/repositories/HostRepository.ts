import { Inject } from "typedi";
import { Host } from "../domain/Host";
import { Id } from "../valueObjects/Id";
import { BookingRepository } from "./BookingRepository";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { Booking } from "../domain/Booking";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";

export class HostRepository {
  constructor(
    @Inject() private _db: Db,
    @Inject() private _bookingRepository: BookingRepository,
  ) {}

  public async getById(id: string): Promise<Host> {
    const hostData = await this._db.findOneBy("host", { id });
    const upcomingBookings = await this._bookingRepository.getAll({
      hostId: id,
      date: { $gte: currentDate },
    });

    const createHostDTO = new CreateHostDTO(hostData);
    const host = Host.fromDTO(createHostDTO);

    host.setUpcomingBookings(upcomingBookings);

    return host;
  }

  public async save(host: Host): Promise<Id> {
    const hostDTO = host.getProperties();
    const upcomingBookings = host.getUpcomingBookings();

    await this._db.saveOrUpdate("host", hostDTO);
    this._bookingRepository.saveAll(upcomingBookings);

    return host.id;
  }
}
