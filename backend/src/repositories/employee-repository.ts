import prisma from "../config/database";
import { Employee } from "../protocols";

class EmployeeRepository {
  async create(employee: Employee) {
    return await prisma.employee.create({ data: employee });
  }
  async FindByEmployeeId(employeeId: number) {
    return await prisma.employee.findFirst({ where: { id: employeeId }, include:{vacationPeriods: true} });
  }

  async getAll(){
    return await prisma.employee.findMany({
      include: {vacationPeriods: true}
    });
  }
}

export default new EmployeeRepository();
