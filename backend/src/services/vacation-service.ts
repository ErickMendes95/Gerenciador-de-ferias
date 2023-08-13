import dayjs from "dayjs";
import { badResquestError } from "../errors/bad-request-error";
import { notFoundError } from "../errors/not-found-error";
import { Vacation } from "../protocols";
import employeeRepository from "../repositories/employee-repository";
import vacationRepository from "../repositories/vacation-repository";
import { unauthorizedError } from "../errors/unauthorized-error";

function isValidVacationDays(vacation: Vacation[]) {
  let durationInDays = 0;
  let hasVacationWith14Days = false;

  vacation.forEach((v) => {
    const startDate = dayjs(v.startDate);
    const endDate = dayjs(v.endDate);
    const vacationNumberOfDays = endDate.diff(startDate, "day") + 1;

    if (vacationNumberOfDays < 5) {
      throw badResquestError("Number of days is less than 5");
    }
    if (vacationNumberOfDays >= 14 && !hasVacationWith14Days) {
      hasVacationWith14Days = true;
    }
    durationInDays += vacationNumberOfDays;
  });

  if (hasVacationWith14Days === false)
    throw badResquestError("One of the vacations need to be at least 14 days");

  if (durationInDays !== 30)
    throw badResquestError("Sum of number of days is different than 30");
}
function isOverlappingVacation(
  vacations: Vacation[],
  existingVacations: Vacation[]
) {
  for (const vacation of vacations) {
    for (const existingVacation of existingVacations) {
      if (
        (dayjs(vacation.startDate) <= dayjs(existingVacation.endDate) &&
          dayjs(vacation.startDate) >= dayjs(existingVacation.startDate)) ||
        (dayjs(vacation.endDate) >= dayjs(existingVacation.startDate) &&
          dayjs(vacation.endDate) <= dayjs(existingVacation.endDate)) ||
        (dayjs(vacation.startDate) <= dayjs(existingVacation.startDate) &&
          dayjs(vacation.endDate) >= dayjs(existingVacation.endDate))
      ) {
        throw badResquestError(
          "New vacation period overlaps with an existing vacation"
        );
      }
    }
  }
}
class VacationService {
  async create(employeeId: number, vacation: Vacation[]) {
    if (!employeeId) throw badResquestError("Employee Id is required");

    vacation.map((v) => {
      if (!v.startDate) throw badResquestError("Start Date is required");
      if (!v.endDate) throw badResquestError("End Data is required");
    });

    //validação da quantidade de dias e de fracionamento de férias
    isValidVacationDays(vacation);

    const employee = await employeeRepository.FindByEmployeeId(employeeId);
    if (!employee) throw notFoundError("Employee don't exist");

    //validação se funcionario pode tirar férias
    const today = dayjs();
    const hireDate = dayjs(employee.hireDate);
    const monthsSinceHire = today.diff(hireDate, "month");

    if (monthsSinceHire < 12) {
      throw unauthorizedError(
        "Employee doesn't have more than 1 year of contract"
      );
    }

    //validação se as férias informadas sobrepoe alguma outra férias já existente
    const existingVacations = employee.vacationPeriods;
    isOverlappingVacation(vacation, existingVacations);

    return await vacationRepository.create(employeeId, vacation);
  }
}

export default new VacationService();
