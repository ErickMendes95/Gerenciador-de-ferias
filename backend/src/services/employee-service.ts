import dayjs from "dayjs";
import { badResquestError } from "../errors/bad-request-error";
import { notFoundError } from "../errors/not-found-error";
import { Employee } from "../protocols";
import employeeRepository from "../repositories/employee-repository";
import vacationRepository from "../repositories/vacation-repository";

class EmployeeService {
  async getAll() {
    const users = await employeeRepository.getAll();
    if (users.length === 0) {
      throw notFoundError("Nenhum usuário encontrado");
    }
    return users;
  }
  async create(employee: Employee) {
    if (!employee.name) throw badResquestError("Nome é necessário");
    if (!employee.role) throw badResquestError("Cargo é necessário");
    if (!employee.hireDate) throw badResquestError("Data de contratação é necessário");

    employee.hireDate = dayjs(employee.hireDate).toDate()
    employee.lastCanTakeVacationUpdate = employee.hireDate
    return await employeeRepository.create(employee);
  }

  async updateCanTakeVacationByCron(employeeId: number,canTakeVacationBoolean: boolean, lastCanTakeVacationDate: Date) {
    const existingEmployee = await employeeRepository.FindByEmployeeId(employeeId);
    if(!existingEmployee){
      throw notFoundError("Funcionário não encontrado");
    }
    if(existingEmployee.canTakeVacation){
      throw badResquestError("Funcionário possui férias a serem tiradas");
    }
    return await vacationRepository.updateCanTakeVacationByCron(employeeId,canTakeVacationBoolean, lastCanTakeVacationDate)
  }
}

export default new EmployeeService();
