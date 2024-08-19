import { Inject, Service } from "typedi";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { Client } from "../domain/Client";
import { HostService } from "./HostService";
import { ClientDTO } from "../dtos/ClientDTO";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";
import { UpdateBookingDTO } from "../dtos/UpdateBookingDTO";
import { BookingDTO } from "../dtos/BookingDTO";
import { UnitOfWorkService } from "./UnitOfWorkService";
import { BookingSorting } from "../valueObjects/BookingSorting";
import { BookingFilters } from "../valueObjects/BookingFilters";

@Service()
export class ClientService {
  constructor(
    // @Inject() private _clientReposotory: ClientRepository,
    // @Inject() private _bookingRepository: BookingRepository,
    @Inject() private _hostService: HostService,
    @Inject() private _unitOfWork: UnitOfWorkService,
  ) {}
  public async getClient(id: string): Promise<ClientDTO> {
    const client = await this._unitOfWork.clientRepository.getById(id);
    return client.getProperties();
  }
  public async deleteClient(id: string): Promise<{ id: string }> {
    const { value } = await this._unitOfWork.clientRepository.deleteById(id);
    return { id: value };
  }
  async createClient(data: CreateClientDTO): Promise<{ id: string }> {
    const client = Client.fromDTO(data);
    return await this._unitOfWork.clientRepository.save(client);
  }

  public async getBookings(
    sorting: BookingSorting,
    filters: BookingFilters,
  ): Promise<Array<BookingDTO>> {
    const bookings = await this._unitOfWork.bookingRepository.getAll(
      sorting,
      filters,
    );
    const dtos = bookings.map((booking) => booking.getProperties());
    return dtos;
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
