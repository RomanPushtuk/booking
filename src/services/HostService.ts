import { Inject, Service } from "typedi";
import { nanoid } from "nanoid";
import { Booking } from "../domain/Booking";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { Host } from "../domain/Host";
import { BookingDTO } from "../dtos/BookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { UpdateHostDTO } from "../dtos/UpdateHostDTO";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";
import { WorkPeriod } from "../application/WorkPeriod";
import { Weekday } from "../valueObjects/Weekday";
import { WorkHours } from "../application/WorkHours";
import { WorkDays } from "../application/WorkDays";
import { HostRepository } from "../repositories/HostRepository";
import { BookingRepository } from "../repositories/BookingRepository";

@Service()
export class HostService {
  constructor(
    @Inject() private _hostRepository: HostRepository,
    @Inject() private _bookingRepository: BookingRepository,
  ) {}

  public async getHost(id: string): Promise<HostDTO> {
    const host = await this._hostRepository.getById(id);
    return new HostDTO(host.getProperties());
  }

  public async getHosts(): Promise<HostDTO[]> {
    const hosts = await this._hostRepository.getAll();
    return hosts.map((host) => new HostDTO(host.getProperties()));
  }

  public async updateHost(
    id: string,
    updateHostDTO: UpdateHostDTO,
  ): Promise<{ id: string }> {
    const host = await this._hostRepository.getById(id);
    const { workHours, workDays } = updateHostDTO;

    if (workHours) {
      const newWorkHours = new WorkHours(
        workHours.map(({ from, to }) => WorkPeriod.fromFlat(from, to)),
      );
      host.setWorkHours(newWorkHours);
    }

    if (workDays) {
      const newWorkDays = new WorkDays(
        workDays.map((item) => new Weekday(item)),
      );
      host.setWorkDays(newWorkDays);
    }

    return await this._hostRepository.save(host);
  }

  public async deleteHost(id: string): Promise<{ id: string }> {
    const host = await this._hostRepository.getById(id);
    host.setIsDeleted(true);
    return await this._hostRepository.save(host);
  }

  public async createHost(data: CreateHostDTO): Promise<{ id: string }> {
    const hostDto = new HostDTO({ id: nanoid(8), ...data });
    const host = Host.fromDTO(hostDto);
    return await this._hostRepository.save(host);
  }

  public async getHostBookings(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._bookingRepository.getAll(sorting, filters);

    return bookings.map((item) => {
      const bookingProperties = item.getProperties();
      return new BookingDTO(bookingProperties);
    });
  }

  public async createBooking(data: BookingDTO): Promise<{ id: string }> {
    const host = await this._hostRepository.getById(data.hostId);
    const booking = Booking.fromDTO(data);
    host.addBooking(booking);

    return await this._hostRepository.save(host);
  }

  public async cancelBookingByClient(
    bookingId: string,
    clientId: string,
  ): Promise<{ id: string }> {
    const booking = await this._bookingRepository.getById(bookingId);
    const host = await this._hostRepository.getById(booking.hostId.value);
    host.cancelBookingByClient(booking, clientId);
    this._hostRepository.save(host);
    return { id: bookingId };
  }

  public async cancelBookingByHost(
    bookingId: string,
    hostId: string,
  ): Promise<{ id: string }> {
    const booking = await this._bookingRepository.getById(bookingId);
    const host = await this._hostRepository.getById(booking.hostId.value);
    host.cancelBookingByHost(booking, hostId);
    this._hostRepository.save(host);
    return { id: bookingId };
  }
}
