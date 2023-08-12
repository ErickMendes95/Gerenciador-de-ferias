import dayjs from "dayjs";
import { badResquestError } from "../errors/bad-request-error";
import { notFoundError } from "../errors/not-found-error";
import { Employee } from "../protocols";
import employeeRepository from "../repositories/employee-repository";

class EmployeeService {
  async getAll() {
    const users = await employeeRepository.getAll();
    if (users.length === 0) {
      throw notFoundError("No employees found");
    }
    return users;
  }
  async create(employee: Employee) {
    if (!employee.name) throw badResquestError("Name is required");
    if (!employee.role) throw badResquestError("Role is required");
    if (!employee.hireDate) throw badResquestError("HireDate is required");

    employee.hireDate = dayjs(employee.hireDate).toDate()
    return await employeeRepository.create(employee);
  }
}

export default new EmployeeService();
