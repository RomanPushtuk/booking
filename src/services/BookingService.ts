import { Inject } from "typedi";
import { AuthRoles } from "../enums/Roles";
import { UserRepository } from "../repositories/UserRepository";

interface IBookingService {
  getBooking(id: string): BookingDTO;
  getBookings(sort: Sort, filter: BookingFilter): Array<BookingDTO>;
  createBooking(data: CreateBookingDTO): Id;
  updateBooking(data: UpdateBookingDTO): Id;
  cancelBooking(id: string): Id;
  deleteBooking(id: string): Id;
}

class BookingService implements IBookingService {
  constructor(@Inject() private bookingRepository: BookingRepository) {}

  getBooking(id: string) {
    throw new Error("Method not implemented.");
  }
  getBookings(sort: Sort, filter: BookingFilter): Array<BookingDTO> {
    throw new Error("Method not implemented.");
  }
  createBooking(data: CreateBookingDTO) {
    const booking = Booking.fromDTO(data);
  }
  updateBooking(data: UpdateBookingDTO) {
    throw new Error("Method not implemented.");
  }

  cancelBooking(
    bookingId: string,
    @CurrentUser({ required: true }) user: User,
  ) {
    const booking = this.bookingRepository.findById(bookingId);
    const host = this.hostRepository.findById(booking.hostId);

    host.cancelBooking(booking);
  }

  deleteBooking(id: string) {
    throw new Error("Method not implemented.");
  }
}
