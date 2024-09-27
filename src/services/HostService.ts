import { Inject, Service } from "typedi";
import { nanoid } from "nanoid";
import { Booking } from "../domain/Booking";
import { CreateHostDTO } from "../dtos/CreateHostDTO";
import { Host } from "../domain/Host";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { UpdateHostDTO } from "../dtos/UpdateHostDTO";
import { UnitOfWorkService } from "./UnitOfWorkService";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";
import { WorkPeriod } from "../application/WorkPeriod";
import { Weekday } from "../valueObjects/Weekday";

@Service()
export class HostService {
  constructor(@Inject() private _unitOfWork: UnitOfWorkService) {}

  public async getHost(id: string): Promise<HostDTO> {
    const host = await this._unitOfWork.hostRepository.getById(id);
    return new HostDTO(host.getProperties());
  }

  public async getHosts(): Promise<HostDTO[]> {
    const hosts = await this._unitOfWork.hostRepository.getAll();
    return hosts.map((host) => new HostDTO(host.getProperties()));
  }

  public async updateHost(
    id: string,
    updateHostDTO: UpdateHostDTO,
  ): Promise<{ id: string }> {
    const host = await this._unitOfWork.hostRepository.getById(id);
    const { workHours, workDays } = updateHostDTO;

    if (workHours) {
      const newWorkHours = workHours.map(({ from, to }) =>
        WorkPeriod.fromFlat(from, to),
      );
      host.setWorkHours(newWorkHours);
    }

    if (workDays) {
      const newWorkDays = workDays.map((item) => new Weekday(item));
      host.setWorkDays(newWorkDays);
    }

    return await this._unitOfWork.hostRepository.save(host);
  }

  public async deleteHost(id: string): Promise<{ id: string }> {
    const host = await this._unitOfWork.hostRepository.getById(id);
    host.setIsDeleted(true);
    return await this._unitOfWork.hostRepository.save(host);
  }

  public async createHost(data: CreateHostDTO): Promise<{ id: string }> {
    const hostDto = new HostDTO({ id: nanoid(8), ...data });
    const host = Host.fromDTO(hostDto);
    return await this._unitOfWork.hostRepository.save(host);
  }

  public async getHostBookings(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._unitOfWork.bookingRepository.getAll(
      sorting,
      filters,
    );

    return bookings.map((item) => {
      const bookingProperties = item.getProperties();
      return new BookingDTO(bookingProperties);
    });
  }

  public async createBooking(data: BookingDTO): Promise<{ id: string }> {
    const host = await this._unitOfWork.hostRepository.getById(data.hostId);
    const booking = Booking.fromDTO(data);
    host.addBooking(booking);

    return this._unitOfWork.makeTransactional<Promise<{ id: string }>>(
      async () => {
        return await this._unitOfWork.hostRepository.save(host);
      },
    );
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
