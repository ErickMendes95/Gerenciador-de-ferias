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

    if (startDate < dayjs() || endDate < dayjs()) {
      throw badResquestError(
        "A data das férias não pode ser anterior ao dia atual"
      );
    }

    const oneYearFromNow = dayjs().add(1, "year");
    if (startDate.isAfter(oneYearFromNow) || endDate.isAfter(oneYearFromNow)) {
      throw badResquestError(
        "As férias colocadas passam do período de um ano permitido"
      );
    }

    if (vacationNumberOfDays < 5) {
      throw badResquestError("Número de dias é menor que 5");
    }
    if (vacationNumberOfDays >= 14 && !hasVacationWith14Days) {
      hasVacationWith14Days = true;
    }
    durationInDays += vacationNumberOfDays;
  });

  if (hasVacationWith14Days === false)
    throw badResquestError("Uma das férias precisa ter pelo menos 14 dias");

  if (durationInDays !== 30)
    throw badResquestError("A soma dos dias é diferente de 30");
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
          "O período inserido conflui com uma férias já existente"
        );
      }
    }
  }
}
class VacationService {
  async create(employeeId: number, vacation: Vacation[]) {
    if (!employeeId) throw badResquestError("Id do funcionário é necessário");

    vacation.map((v) => {
      if (!v.startDate)
        throw badResquestError("Data de início das férias é necessário");
      if (!v.endDate)
        throw badResquestError("Data de fim das férias é necessário");
    });

    //validação da quantidade de dias e de fracionamento de férias
    isValidVacationDays(vacation);

    const employee = await employeeRepository.FindByEmployeeId(employeeId);
    if (!employee) throw notFoundError("Funcionário não existe");
    //validação se funcionario pode tirar férias
    const today = dayjs();
    const hireDate = dayjs(employee.hireDate);
    const monthsSinceHire = today.diff(hireDate, "month");

    if (monthsSinceHire < 12) {
      throw unauthorizedError(
        "Funcionário não possui mais de um ano de contrato"
      );
    }

    if (!employee.canTakeVacation) {
      throw unauthorizedError("Usuário já tirou a férias anual");
    }

    //validação se as férias informadas sobrepoe alguma outra férias já existente
    const existingVacations = employee.vacationPeriods;
    isOverlappingVacation(vacation, existingVacations);

    const vacationCreated = await vacationRepository.create(
      employeeId,
      vacation
    );
    const canTakeVacation = false;
    await vacationRepository.updateCanTakeVacation(employeeId, canTakeVacation);

    return vacationCreated;
  }
}

export default new VacationService();
