import { Inject, Service } from "typedi";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { Client } from "../domain/Client";
import { HostService } from "./HostService";
import { ClientDTO } from "../dtos/ClientDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { BookingSorting } from "../application/BookingSorting";
import { BookingFilters } from "../application/BookingFilters";

@Service()
export class ClientService {
  constructor(@Inject() private _hostService: HostService) {}

  public async getClient(id: string): Promise<ClientDTO> {
    const client = await this._unitOfWork.clientRepository.getById(id);
    const clientProperties = client.getProperties();
    const clientDto = new ClientDTO(clientProperties);
    return clientDto;
  }

  public async deleteClient(id: string): Promise<{ id: string }> {
    const client = await this._unitOfWork.clientRepository.getById(id);
    client.seIsDeleted(true);
    return await this._unitOfWork.clientRepository.save(client);
  }

  public async createClient(data: CreateClientDTO): Promise<{ id: string }> {
    const client = Client.fromDTO(data);
    return await this._unitOfWork.clientRepository.save(client);
  }

  public async getBookings(
    sorting?: BookingSorting,
    filters?: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._unitOfWork.bookingRepository.getAll(
      sorting,
      filters,
    );
    const dtos = bookings.map((booking) => booking.getProperties());
    return dtos;
  }

  public async createBooking(data: BookingDTO): Promise<{ id: string }> {
    return this._hostService.createBooking(data);
  }

  public async cancelBooking(
    id: string,
    clientId: string,
  ): Promise<{ id: string }> {
    return this._hostService.cancelBookingByClient(id, clientId);
  }
}
