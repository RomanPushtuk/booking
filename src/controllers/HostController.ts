import {
  Controller,
  Param,
  Body,
  Get,
  Patch,
  Delete,
  Authorized,
  CurrentUser,
  QueryParam,
} from "routing-controllers";
import { Inject } from "typedi";
import { Roles } from "../enums/Roles";
import { User } from "../domain/User";
import { HostService } from "../services/HostService";
import { BookingSorting } from "../types/BookingSorting";
import { BookingFilters } from "../types/BookingFilters";
import { BookingDTO } from "../dtos/BookingDTO";
import { HostDTO } from "../dtos/HostDTO";
import { UpdateHostDTO } from "../dtos/UpdateHostDTO";

@Controller("/hosts")
export class HostController {
  constructor(@Inject() private _hostService: HostService) {}

  @Get("/:id")
  async getHost(@Param("id") id: string): Promise<HostDTO> {
    return await this._hostService.getHost(id);
  }

  @Patch("/:id")
  @Authorized([Roles.HOST])
  async updateHost(
    @Param("id") id: string,
    @Body() updateHostDTO: UpdateHostDTO,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    if (user.id.value !== id) throw new Error("400");
    return await this._hostService.updateHost(id, updateHostDTO);
  }

  @Delete("/:id")
  async deleteClient(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: User,
  ): Promise<{ id: string }> {
    if (user.id.value !== id) throw new Error("400");
    return await this._hostService.deleteHost(id);
  }

  @Get("/:id/bookins")
  public async getBookings(
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
      hostId: user.id.value,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    };
    return this._hostService.getBookings(sorting, filters);
  }
}
