import express from "express";
import vacationController from "../controllers/vacation-controller";

const vacationRouter = express.Router();

vacationRouter.post("/vacation", vacationController.create);

export { vacationRouter };
