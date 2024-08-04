export interface IHostController {
  getHost(id: string): Id;
  getHosts(sort: Sort, filter: HostFilter): List<HostDTO>;
  createHost(data: CreateHostDTO): Id;
  deleteHost(id: string): Id;
  getBooking(id: string): HostBookingDTO;
  getBookings(sort: Sort, filter: BookingFilter): List<HostBookingDTO>;
}
