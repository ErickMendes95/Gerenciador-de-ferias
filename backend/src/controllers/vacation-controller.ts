import httpStatus from "http-status";
import { Vacation } from "../protocols";
import { Request, Response } from "express";
import vacationService from "../services/vacation-service";

class VacationController {
  async create(req: Request, res: Response) {
    const vacation: Vacation[] = req.body;
    try {
      const vacationCreated = await vacationService.create(vacation);
      return res.status(httpStatus.CREATED).send(vacationCreated);
    } catch (error: any) {
      if (error.name === "BadRequestError") {
        return res.status(httpStatus.BAD_REQUEST).send(error.message);
      }
      if (error.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      if(error.name === "UnauthorizedError"){
        return res.status(httpStatus.UNAUTHORIZED).send(error.message);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}

export default new VacationController();
