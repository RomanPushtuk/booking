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
import moment from "moment";
import { nanoid } from "nanoid";

import { Roles } from "../enums/Roles";
import { ClientService } from "../services/ClientService";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { ClientDTO } from "../dtos/ClientDTO";
import { User } from "../domain/User";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";
import { Logger } from "../application/Logger";

@JsonController("/clients")
@Service()
export class ClientController {
  constructor(@Inject() private _clientService: ClientService) {}

  @Get("/me")
  @Authorized([Roles.CLIENT])
  async getMe(@CurrentUser({ required: true }) user: User): Promise<ClientDTO> {
    Logger.get().info("logger works2");
    return this._clientService.getClient(user.id.value);
  }

  @Delete("/me")
  @Authorized([Roles.CLIENT])
  async deleteClient(
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    return this._clientService.deleteClient(user.id.value);
  }

  @Get("/me/bookings")
  @Authorized([Roles.CLIENT])
  async getBookings(
    @QueryParam("sort-direction") sortDirection: string = "desc",
    @QueryParam("sort-property") sortProperty: string = "date",
    @QueryParam("dateFrom") dateFrom: string = moment().format("YYYY-MM-DD"),
    @QueryParam("dateTo") dateTo: string,
    @QueryParam("timeFrom") timeFrom: string = "0:00",
    @QueryParam("timeTo") timeTo: string = "23:59",
    @CurrentUser({ required: true }) user: User,
  ): Promise<BookingDTO[]> {
    const sorting = new BookingSorting(sortDirection, sortProperty);
    const filters = new BookingFilters({
      clientId: user.id.value,
      hostId: undefined,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    });
    return this._clientService.getBookings(sorting, filters);
  }

  @Post("/me/bookings")
  @Authorized([Roles.CLIENT])
  public async createBooking(
    @Body() body: any,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    const createBookingDTO = new CreateBookingDTO(body);
    const bookingDto = new BookingDTO({
      id: nanoid(8),
      clientId: user.id.value,
      ...createBookingDTO,
    });
    return this._clientService.createBooking(bookingDto);
  }

  @Post("/me/bookins/:bookingId/cancel")
  @Authorized([Roles.CLIENT])
  async cancelBooking(
    @Param("bookingId") bookingId: string,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    return this._clientService.cancelBooking(bookingId, user.id.value);
  }
}
