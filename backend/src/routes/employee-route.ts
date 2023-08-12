import express from "express";
import employeeController from "../controllers/employee-controller";

const employeeRouter = express.Router();

employeeRouter.post("/employee", employeeController.create);
employeeRouter.get("/employee", employeeController.getAll);

export { employeeRouter };
