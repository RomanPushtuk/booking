import {
  Param,
  Body,
  Get,
  Patch,
  Delete,
  Authorized,
  CurrentUser,
  QueryParam,
  JsonController,
} from "routing-controllers";
import moment from "moment";
import { Inject, Service } from "typedi";
import { Roles } from "../enums/Roles";
import { User } from "../domain/User";
import { HostService } from "../services/HostService";
import { BookingDTO } from "../dtos/BookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { UpdateHostDTO } from "../dtos/UpdateHostDTO";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";

@JsonController("/hosts")
@Service()
export class HostController {
  constructor(@Inject() private _hostService: HostService) {}

  @Get()
  async getHosts(): Promise<HostDTO[]> {
    return await this._hostService.getHosts();
  }

  @Get("/me")
  @Authorized([Roles.HOST])
  async getMe(@CurrentUser({ required: true }) user: User): Promise<HostDTO> {
    return await this._hostService.getHost(user.id.value);
  }

  @Patch("/me")
  @Authorized([Roles.HOST])
  async updateHost(
    @Body() updateHostBody: any,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    const updateHostDTO = new UpdateHostDTO(updateHostBody);
    return await this._hostService.updateHost(user.id.value, updateHostDTO);
  }

  @Delete("/me")
  @Authorized([Roles.HOST])
  async deleteHost(
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    return await this._hostService.deleteHost(user.id.value);
  }

  @Get("/me/bookings")
  @Authorized([Roles.HOST])
  public async getMyBookings(
    @CurrentUser({ required: true }) user: User,
    @QueryParam("clientId") clientId?: string,
    @QueryParam("sort-direction") sortDirection: string = "desc",
    @QueryParam("sort-property") sortProperty: string = "date",
    @QueryParam("dateFrom") dateFrom: string = moment().format("YYYY-MM-DD"),
    @QueryParam("dateTo") dateTo?: string,
    @QueryParam("timeFrom") timeFrom: string = "0:00",
    @QueryParam("timeTo") timeTo: string = "23:59",
  ): Promise<Array<BookingDTO>> {
    const sorting = new BookingSorting(sortDirection, sortProperty);
    const filters = new BookingFilters({
      clientId,
      hostId: user.id.value,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    });
    return this._hostService.getHostBookings(sorting, filters);
  }

  @Get("/:id")
  async getHost(@Param("id") id: string): Promise<HostDTO> {
    return await this._hostService.getHost(id);
  }

  @Get("/:id/bookings")
  public async getHostBookings(
    @Param("id") hostId: string,
    @QueryParam("sort-direction") sortDirection: string = "desc",
    @QueryParam("sort-property") sortProperty: string = "date",
    @QueryParam("dateFrom") dateFrom: string = moment().toISOString(),
    @QueryParam("dateTo") dateTo?: string,
    @QueryParam("timeFrom") timeFrom: string = "0:00",
    @QueryParam("timeTo") timeTo: string = "23:59",
  ): Promise<Array<BookingDTO>> {
    const sorting = new BookingSorting(sortDirection, sortProperty);
    const filters = new BookingFilters({
      clientId: undefined,
      hostId,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    });
    return this._hostService.getHostBookings(sorting, filters);
  }
}
