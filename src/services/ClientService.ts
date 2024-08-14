import { Inject, Service } from "typedi";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../domain/Client";
import { BookingRepository } from "../repositories/BookingRepository";
import { HostService } from "./HostService";
import { ClientDTO } from "../dtos/ClientDTO";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { BookingSorting } from "../types/BookingSorting";
import { BookingFilters } from "../types/BookingFilters";

@Service()
export class ClientService {
  constructor(
    @Inject() private _clientReposotory: ClientRepository,
    @Inject() private _bookingRepository: BookingRepository,
    @Inject() private _hostService: HostService,
  ) {}
  public async getClient(id: string): Promise<ClientDTO> {
    const client = await this._clientReposotory.getById(id);
    return client.getProperties();
  }
  public async deleteClient(id: string): Promise<{ id: string }> {
    const { value } = await this._clientReposotory.deleteById(id);
    return { id: value };
  }
  async createClient(data: CreateClientDTO): Promise<{ id: string }> {
    const client = Client.fromDTO(data);
    return await this._clientReposotory.save(client);
  }

  public async getBookings(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._bookingRepository.getAll(sorting, filters);
    return [];
  }
  public async createBooking(data: CreateBookingDTO): Promise<{ id: string }> {
    return this._hostService.createBooking(data);
  }
  public async updateBooking(data: UpdateBookingDTO): Promise<{ id: string }> {
    return this._hostService.updateBooking(data);
  }
  public async cancelBooking(
    id: string,
    clientId: string,
  ): Promise<{ id: string }> {
    return this._hostService.cancelBookingByClient(id, clientId);
  }
}
