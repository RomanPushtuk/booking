import { Inject, Service } from "typedi";
import { Booking } from "../domain/Booking";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { Host } from "../domain/Host";
import { HostRepository } from "../repositories/HostRepository";
import { BookingRepository } from "../repositories/BookingRepository";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { BookingSorting } from "../types/BookingSorting";
import { BookingFilters } from "../types/BookingFilters";
import { BookingDTO } from "../dtos/BookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { UpdateHostDTO } from "../dtos/UpdateHostDTO";

@Service()
export class HostService {
  getHost(id: string): Promise<HostDTO> {
    throw new Error("Method not implemented.");
  }

  updateHost(
    id: string,
    updateHostDTO: UpdateHostDTO,
  ): Promise<{ id: string }> {
    throw new Error("Method not implemented.");
  }

  deleteHost(id: string): Promise<{ id: string }> {
    throw new Error("Method not implemented.");
  }
  constructor(
    @Inject() private _hostRepository: HostRepository,
    @Inject() private _bookingRepository: BookingRepository,
  ) {}

  public async createHost(data: CreateHostDTO): Promise<{ id: string }> {
    const host = Host.fromDTO(data);
    const id = await this._hostRepository.save(host);
    return { id: id.value };
  }

  public async getBookings(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._bookingRepository.getAll(sorting, filters);
    return bookings.map((booking) => booking.getProperties());
  }

  public async createBooking(data: CreateBookingDTO): Promise<{ id: string }> {
    const host = await this._hostRepository.getById(data.hostId);
    const bookingDto = new BookingDTO({
      ...data,
      canceled: false,
      deleted: false,
    });
    const booking = Booking.fromDTO(bookingDto);
    host.addBooking(booking);
    await this._hostRepository.save(host);

    return { id: booking.id.value };
  }

  public async updateBooking(data: UpdateBookingDTO): Promise<{ id: string }> {
    const booking = await this._bookingRepository.getById(data.id);
    const host = await this._hostRepository.getById(booking.hostId);
    host.updateBooking(booking, data);
    await this._hostRepository.save(host);
    return { id: booking.id.value };
  }

  public async cancelBookingByClient(
    bookingId: string,
    clientId: string,
  ): Promise<{ id: string }> {
    const booking = await this._bookingRepository.getById(bookingId);
    const host = await this._hostRepository.getById(booking.hostId);
    host.cancelBookingByClient(booking, clientId);
    this._hostRepository.save(host);
    return { id: bookingId };
  }

  public async cancelBookingByHost(
    bookingId: string,
    hostId: string,
  ): Promise<{ id: string }> {
    const booking = await this._bookingRepository.getById(bookingId);
    const host = await this._hostRepository.getById(booking.hostId);
    host.cancelBookingByHost(booking, hostId);
    this._hostRepository.save(host);
    return { id: bookingId };
  }
}
