import cron from "node-cron";
import axios from "axios";
import dayjs from "dayjs";
import { Employee } from "@prisma/client";

class EmployeeVacationUpdater {
  async updateEmployeeVacationEligibility() {
    const employeesResponse = await axios.get("http://localhost:4000/employee");
    const employees: Employee[] = employeesResponse.data;
    const currentDate = dayjs();

    employees.forEach(async (employee: Employee) => {
      const hireDate = dayjs(employee.hireDate).toDate();
      const monthsSinceHire = currentDate.diff(hireDate, "month");
      const lastCanTakeVacationUpdate = dayjs(
        employee.lastCanTakeVacationUpdate
      );

      if (
        monthsSinceHire > 12 &&
        !employee.canTakeVacation &&
        lastCanTakeVacationUpdate.add(12, "month").isBefore(currentDate)
      ) {
        await axios.put(
          `http://localhost:4000/employee/${employee.id}/canTakeVacationByCron`,
          {
            canTakeVacation: true,
            lastCanTakeVacationUpdate: dayjs(employee.lastCanTakeVacationUpdate)
              .add(1, "year")
              .toDate(),
          }
        );
      } else {
      }
    });
  }

  startCronJob() {
    cron.schedule("0 10 * * *", () => {
      this.updateEmployeeVacationEligibility();
    });
  }
}

export default EmployeeVacationUpdater;
