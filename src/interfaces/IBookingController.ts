export interface IBookingController {
  getBooking(id: string): BookingDTO;
  getBookings(sort: Sort, filter: BookingFilter): List<BookingDTO>;
  createBooking(): Id;
  updateBooking(id: string): Id;
  cancelBooking(id: string): Id;
  deletebooking(id: string): Id;
}
