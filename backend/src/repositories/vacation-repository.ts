import dayjs from "dayjs";
import prisma from "../config/database";
import { Vacation } from "../protocols";

class VacationRepository {
  async create(vacation: Vacation[]) {
    const createdVacations: Vacation[] = [];
    const vacationPromises = vacation.map(async (v) => {
      const createdVacation = await prisma.vacation.create({
        data: {
          employeeId: v.employeeId,
          startDate: dayjs(v.startDate).toDate(),
          endDate: dayjs(v.endDate).toDate(),
        },
      });
      createdVacations.push(createdVacation)
    });

    await Promise.all(vacationPromises);
    return createdVacations;
  }
}

export default new VacationRepository();
