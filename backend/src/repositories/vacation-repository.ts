import dayjs from "dayjs";
import prisma from "../config/database";
import { Vacation } from "../protocols";

class VacationRepository {
  async create(employeeId: number, vacation: Vacation[]) {
    const createdVacations: Vacation[] = [];
    const vacationPromises = vacation.map(async (v) => {
      const createdVacation = await prisma.vacation.create({
        data: {
          employeeId: employeeId,
          startDate: dayjs(v.startDate).toDate(),
          endDate: dayjs(v.endDate).toDate(),
        },
      });
      createdVacations.push(createdVacation)
    });

    await Promise.all(vacationPromises);
    return createdVacations;
  }

  async updateCanTakeVacation(employeeId: number, canTakeVacation:boolean){
    await prisma.employee.update({
      where: {id: employeeId},
      data: {canTakeVacation}
    })
  }

  async updateCanTakeVacationByCron(
    employeeId: number,
    canTakeVacationBoolean: boolean,
    lastCanTakeVacationDate: Date
  ) {
    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        canTakeVacation: canTakeVacationBoolean,
        lastCanTakeVacationUpdate: lastCanTakeVacationDate,
      },
    });
  }
}

export default new VacationRepository();
