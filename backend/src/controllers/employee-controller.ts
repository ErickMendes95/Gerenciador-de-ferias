import httpStatus from "http-status";
import { Employee } from "../protocols";
import { Request, Response } from "express";
import employeeService from "../services/employee-service";

class EmployeeController {
  async create(req: Request, res: Response) {
    const employee: Employee = req.body;
    try {
      const userCreated = await employeeService.create(employee);
      return res.status(httpStatus.CREATED).send(userCreated);
    } catch (error: any) {
      if (error.name === "BadRequestError") {
        return res.status(httpStatus.BAD_REQUEST).send(error.message);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  async getAll(req: Request, res: Response){
    try {
      const users = await employeeService.getAll();
      return res.status(httpStatus.OK).send(users);
    } catch (error: any) {
      if (error.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}

export default new EmployeeController();
