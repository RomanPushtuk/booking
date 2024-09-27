import "reflect-metadata";
import { nanoid } from "nanoid";
import { HostService } from "../../src/services/HostService";
import { UnitOfWorkService } from "../../src/services/UnitOfWorkService";
import { UpdateHostDTO } from "../../src/dtos/UpdateHostDTO";
import { CreateBookingDTO } from "../../src/dtos/CreateBookingDTO";

jest.mock("nanoid", () => {
  return () => "8vwwm4n2";
});

describe("HostService", () => {
  test("hostService.getHost", async () => {
    const unitOfWorkService = new UnitOfWorkService();
    const hostService = new HostService(unitOfWorkService);

    const hostId = "Y9oWsNNc";
    const hostDto = await hostService.getHost(hostId);
    expect(hostDto.id).toBe(hostId);
  });

  test("hostService.getHosts", async () => {
    const unitOfWorkService = new UnitOfWorkService();
    const hostService = new HostService(unitOfWorkService);
    const hostDtos = await hostService.getHosts();
  });

  test("hostService.updateHost", async () => {
    const unitOfWorkService = new UnitOfWorkService();
    const hostService = new HostService(unitOfWorkService);
    const updateHostDTO = new UpdateHostDTO({
      workHours: [
        { from: "10:00", to: "14:00" },
        { from: "15:00", to: "18:00" },
      ],
      workDays: ["monday", "tuesday"],
    });
    await hostService.updateHost("Y9oWsNN8", updateHostDTO);
  });

  test("hostService.deleteHost", async () => {});

  test("hostService.createHost", async () => {});

  test("hostService.getHostBookings", async () => {});

  test("hostService.createBooking", async () => {
    const unitOfWorkService = new UnitOfWorkService();
    const hostService = new HostService(unitOfWorkService);

    const createBookingDTO = new CreateBookingDTO({
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-27",
      time: { from: "20:00", to: "21:00" },
    });

    await hostService.createBooking(createBookingDTO);
  });

  test("hostService.cancelBookingByClient", async () => {});

  test("hostService.cancelBookingByHost", async () => {});
});
