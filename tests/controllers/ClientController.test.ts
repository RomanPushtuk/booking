import "reflect-metadata";
import { nanoid } from "nanoid";
import { ClientController } from "../../src/controllers/ClientController";
import { User } from "../../src/domain/User";
import { UserDTO } from "../../src/dtos/UserDTO";
import { ClientService } from "../../src/services/ClientService";
import { BookingSorting } from "../../src/application/BookingSorting";
import { BookingFilters } from "../../src/application/BookingFilters";

jest.mock("nanoid", () => "123");

describe("ClientController", () => {
  const currentUserDTO = new UserDTO({
    id: "fujw234y",
    email: "current_user@gmail.com",
    password: "123Rr456!*",
    role: "client",
  });
  const mockCurrentUser = User.fromDTO(currentUserDTO);

  test("The call of the getClient method must call clientService.getClient", async () => {
    const mockClientService = {
      getClient: jest.fn(),
    } as unknown as ClientService;

    const clientController = new ClientController(mockClientService);
    await clientController.getMe(mockCurrentUser);

    expect(mockClientService.getClient).toHaveBeenCalledWith(currentUserDTO.id);
  });

  test("The call of the deleteClient method must call clientService.getClient", async () => {
    const mockClientService = {
      deleteClient: jest.fn(),
    } as unknown as ClientService;

    const clientController = new ClientController(mockClientService);
    await clientController.deleteClient(mockCurrentUser);

    expect(mockClientService.deleteClient).toHaveBeenCalledWith(
      currentUserDTO.id,
    );
  });

  test("The call of the getBookings method must call clientService.getBookings", async () => {
    const mockClientService = {
      getBookings: jest.fn(),
    } as unknown as ClientService;

    const clientController = new ClientController(mockClientService);

    const sortDirection: string = "desc";
    const sortProperty: string = "date";
    const dateFrom: string = "2024-09-19T19:58:32.565Z";
    const dateTo: string = "2024-09-19T19:58:32.565Z";
    const timeFrom: string = "0:00";
    const timeTo: string = "23:59";

    const sorting = new BookingSorting(sortDirection, sortProperty);
    const filters = new BookingFilters(
      mockCurrentUser.id.value,
      undefined,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    );

    await clientController.getBookings(
      sortDirection,
      sortProperty,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      mockCurrentUser,
    );

    expect(mockClientService.getBookings).toHaveBeenCalledWith(
      sorting,
      filters,
    );
  });

  test("The call of the cancelBooking method must call clientService.cancelBooking", async () => {
    const mockClientService = {
      cancelBooking: jest.fn(),
    } as unknown as ClientService;

    const bookingId = "48jf29jd";

    const clientController = new ClientController(mockClientService);
    await clientController.cancelBooking(bookingId, mockCurrentUser);

    expect(mockClientService.cancelBooking).toHaveBeenCalledWith(
      bookingId,
      mockCurrentUser.id.value,
    );
  });
});
