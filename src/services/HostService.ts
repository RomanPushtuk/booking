import { Inject, Service } from "typedi";
import { Booking } from "../domain/Booking";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { Host } from "../domain/Host";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { UpdateHostDTO } from "../dtos/UpdateHostDTO";
import { UnitOfWorkService } from "./UnitOfWorkService";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";
import { nanoid } from "nanoid";

@Service()
export class HostService {
  constructor(@Inject() private _unitOfWork: UnitOfWorkService) {}

  getHost(id: string): Promise<HostDTO> {
    throw new Error("Method not implemented.");
  }

  public async getHosts(): Promise<HostDTO[]> {
    const hosts = await this._unitOfWork.hostRepository.getAll();
    return hosts.map((host) => new HostDTO(host.getProperties()));
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

  public async createHost(data: CreateHostDTO): Promise<{ id: string }> {
    const hostDto = new HostDTO({ id: nanoid(8), ...data });
    const host = Host.fromDTO(hostDto);
    return await this._unitOfWork.hostRepository.save(host);
  }

  public async getBookings(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._unitOfWork.bookingRepository.getAll(
      sorting,
      filters,
    );
    return [];
  }

  public async createBooking(data: CreateBookingDTO): Promise<{ id: string }> {
    const host = await this._unitOfWork.hostRepository.getById(data.hostId);
    const bookingDto = new BookingDTO({ id: nanoid(8), ...data });
    const booking = Booking.fromDTO(bookingDto);
    host.addBooking(booking);
    await this._unitOfWork.hostRepository.save(host);

    return { id: booking.id.value };
  }

  public async updateBooking(data: UpdateBookingDTO): Promise<{ id: string }> {
    const booking = await this._unitOfWork.bookingRepository.getById(data.id);
    const host = await this._unitOfWork.hostRepository.getById(
      booking.hostId.value,
    );
    host.updateBooking(booking, data);
    await this._unitOfWork.hostRepository.save(host);
    return { id: booking.id.value };
  }

  public async cancelBookingByClient(
    bookingId: string,
    clientId: string,
  ): Promise<{ id: string }> {
    const booking = await this._unitOfWork.bookingRepository.getById(bookingId);
    const host = await this._unitOfWork.hostRepository.getById(
      booking.hostId.value,
    );
    host.cancelBookingByClient(booking, clientId);
    this._unitOfWork.hostRepository.save(host);
    return { id: bookingId };
  }

  public async cancelBookingByHost(
    bookingId: string,
    hostId: string,
  ): Promise<{ id: string }> {
    const booking = await this._unitOfWork.bookingRepository.getById(bookingId);
    const host = await this._unitOfWork.hostRepository.getById(
      booking.hostId.value,
    );
    host.cancelBookingByHost(booking, hostId);
    this._unitOfWork.hostRepository.save(host);
    return { id: bookingId };
  }
}
