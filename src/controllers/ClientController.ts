import { Inject, Service } from "typedi";
import {
  Param,
  Body,
  Get,
  Post,
  Delete,
  Authorized,
  CurrentUser,
  QueryParam,
  JsonController,
} from "routing-controllers";
import { Roles } from "../enums/Roles";
import { ClientService } from "../services/ClientService";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { ClientDTO } from "../dtos/ClientDTO";
import { User } from "../domain/User";
import moment from "moment";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";

@JsonController("/clients")
@Service()
export class ClientController {
  constructor(@Inject() private _clientService: ClientService) {}

  @Get("/me")
  @Authorized([Roles.CLIENT])
  async getMe(@CurrentUser({ required: true }) user: User): Promise<ClientDTO> {
    console.log("user - ", user);
    return this._clientService.getClient(user.id.value);
  }

  @Delete("/me")
  @Authorized([Roles.CLIENT])
  async deleteClient(
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    return this._clientService.deleteClient(user.id.value);
  }

  @Get("/bookins")
  @Authorized([Roles.CLIENT])
  async getBookings(
    @QueryParam("sort-direction") sortDirection: string = "desc",
    @QueryParam("sort-property") sortProperty: string = "date",
    @QueryParam("dateFrom") dateFrom: string = moment().format("DD/MM/YYYY"),
    @QueryParam("dateTo") dateTo: string = moment().format("DD/MM/YYYY"),
    @QueryParam("timeFrom") timeFrom: string = "0:00",
    @QueryParam("timeTo") timeTo: string = "23:59",
    @CurrentUser({ required: true }) user: User,
  ): Promise<Array<BookingDTO>> {
    const sorting = new BookingSorting(sortDirection, sortProperty);
    const filters = new BookingFilters(
      user.id.value,
      "",
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    );
    return this._clientService.getBookings(sorting, filters);
  }

  @Post("/bookings")
  @Authorized([Roles.CLIENT])
  public async createBooking(
    @Body() createBookingBody: any,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    const createBookingDTO = new CreateBookingDTO({
      clientId: user.id.value,
      ...createBookingBody,
    });
    return this._clientService.createBooking(createBookingDTO);
  }

  @Post("/:clientId/bookins/:bookingId/cancel")
  @Authorized([Roles.CLIENT])
  async cancelBooking(
    @Param("bookingId") bookingId: string,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    return this._clientService.cancelBooking(bookingId, user.id.value);
  }
}
