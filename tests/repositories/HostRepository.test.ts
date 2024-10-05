import { HostRepository } from "../../src/repositories/HostRepository";
import { BookingRepository } from "../../src/repositories/BookingRepository";
import { db } from "../../db";
import { HostDTO } from "../../src/dtos/HostDTO";
import { Host } from "../../src/domain/Host";

describe("HostRepository", () => {
  test("hostRepository.getById", async () => {
    const hostId = "Y9oWsNNc";
    const hostRepository = new HostRepository(db);

    const host = await hostRepository.getById(hostId);
    expect(host.id.value).toBe(hostId);
  });

  test("hostRepository.getAll", async () => {
    const hostRepository = new HostRepository(db);

    const hosts = await hostRepository.getAll();
    console.log(hosts);
    expect(hosts.length).toBe(2);
  });

  test("hostRepository.save", async () => {
    const hostId = "Y9oWsNN8";
    const { id } = await db.transaction(async (trx) => {
      const hostRepository = new HostRepository(trx);

      const hostDto = new HostDTO({
        id: hostId,
        forwardBooking: "1 week",
        workHours: [{ from: "09:00", to: "13:00" }],
        workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      });
      const host = Host.fromDTO(hostDto);

      return hostRepository.save(host);
    });

    expect(id).toBe(hostId);
  });
});
