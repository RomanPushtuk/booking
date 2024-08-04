import { Inject } from "typedi";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Authorized,
  CurrentUser,
  QueryParam,
} from "routing-controllers";
import { Roles } from "../enums/Roles";
import { ClientService } from "../services/ClientService";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { ClientDTO } from "../dtos/ClientDTO";
import { BookingSorting } from "../types/BookingSorting";
import { BookingFilters } from "../types/BookingFilters";
import { User } from "../domain/User";

@Controller("/clients")
export class ClientController {
  constructor(@Inject() private _clientService: ClientService) {}

  @Get("/:id")
  @Authorized([Roles.CLIENT])
  async getClient(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: User,
  ): Promise<ClientDTO> {
    if (user.id.value !== id) throw new Error("400");
    return this._clientService.getClient(id);
  }

  @Delete("/:id")
  @Authorized([Roles.CLIENT])
  async deleteClient(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    if (user.id.value !== id) throw new Error("400");
    return this._clientService.deleteClient(id);
  }

  @Get("/:id/bookins")
  @Authorized([Roles.CLIENT])
  async getBookings(
    @QueryParam("sort-direction") sortDirection: string = "desc",
    @QueryParam("sort-property") sortProperty: string = "date",
    @QueryParam("dateFrom") dateFrom: string,
    @QueryParam("dateTo") dateTo: string,
    @QueryParam("timeFrom") timeFrom: string,
    @QueryParam("timeTo") timeTo: string,
    @CurrentUser({ required: true }) user: User,
  ): Promise<Array<BookingDTO>> {
    const sorting: BookingSorting = {
      direction: sortDirection,
      property: sortProperty,
    };
    const filters: BookingFilters = {
      clientId: user.id.value,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    };
    return this._clientService.getBookings(sorting, filters);
  }

  @Post("/:id/bookins")
  @Authorized([Roles.CLIENT])
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<{ id: string }> {
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
