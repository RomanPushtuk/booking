import "reflect-metadata";
import { nanoid } from "nanoid";

import { HostService } from "../../src/services/HostService";
import { HostController } from "../../src/controllers/HostController";
import { User } from "../../src/domain/User";
import { UserDTO } from "../../src/dtos/UserDTO";
import { UpdateHostDTO } from "../../src/dtos/UpdateHostDTO";
import { BookingSorting } from "../../src/application/BookingSorting";
import { BookingFilters } from "../../src/application/BookingFilters";

jest.mock("nanoid", () => "8vjwl4w5");

describe("HostController", () => {
  test("The call of the getHosts method must be passed to the hostService.getHosts", async () => {
    const hostService = { getHosts: jest.fn() } as unknown as HostService;
    const authController = new HostController(hostService);
    await authController.getHosts();
    expect(hostService.getHosts).toHaveBeenCalled();
  });

  test("The call of the getHost method must be passed to the hostService.getHost", async () => {
    const hostService = { getHost: jest.fn() } as unknown as HostService;
    const authController = new HostController(hostService);
    const hostId = "7fhw8kwe";
    await authController.getHost(hostId);
    expect(hostService.getHost).toHaveBeenCalledWith(hostId);
  });

  test("The call of the updateHost method must be passed to the hostService.updateHost", async () => {
    const hostService = { updateHost: jest.fn() } as unknown as HostService;
    const authController = new HostController(hostService);
    const currentUserDTO = new UserDTO({
      id: "fujw234y",
      email: "current_user@gmail.com",
      password: "123Rr456!*",
      role: "host",
    });
    const updateHostDTO = new UpdateHostDTO({
      forwardBooking: "1 week",
      workHours: [{ from: "9:00", to: "18:00" }],
      workDays: ["monday"],
    });

    const mockCurrentUser = User.fromDTO(currentUserDTO);
    await authController.updateHost(updateHostDTO, mockCurrentUser);
    expect(hostService.updateHost).toHaveBeenCalledWith(
      mockCurrentUser.id.value,
      updateHostDTO,
    );
  });

  test("The call of the getHost method must be passed to the hostService.getHost", async () => {
    const hostService = { deleteHost: jest.fn() } as unknown as HostService;
    const authController = new HostController(hostService);
    const currentUserDTO = new UserDTO({
      id: "fujw234y",
      email: "current_user@gmail.com",
      password: "123Rr456!*",
      role: "host",
    });
    const mockCurrentUser = User.fromDTO(currentUserDTO);
    await authController.deleteHost(mockCurrentUser);
    expect(hostService.deleteHost).toHaveBeenCalledWith(
      mockCurrentUser.id.value,
    );
  });

  test("The call of the getBookings method must be passed to the hostService.getBookings", async () => {
    const hostService = { getBookings: jest.fn() } as unknown as HostService;
    const hostController = new HostController(hostService);
    const clientId = "9kd33c35";
    const hostId = "1dii3fk3";

    const sortDirection: string = "desc";
    const sortProperty: string = "date";
    const dateFrom: string = "2024-09-19T19:58:32.565Z";
    const dateTo: string = "2024-09-19T19:58:32.565Z";
    const timeFrom: string = "0:00";
    const timeTo: string = "23:59";

    await hostController.getHostBookings(
      hostId,
      clientId,
      sortDirection,
      sortProperty,
      dateFrom,
      dateTo,
      timeFrom,
    );

    const sorting = new BookingSorting(sortDirection, sortProperty);
    const filters = new BookingFilters({
      clientId,
      hostId,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
    });
    expect(hostService.getHostBookings).toHaveBeenCalledWith(sorting, filters);
  });
});
