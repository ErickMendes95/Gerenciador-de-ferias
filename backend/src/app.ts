import express from 'express';
import cors from 'cors';
import {employeeRouter, vacationRouter} from "./routes"

const app = express();

app
    .use(cors())
    .use(express.json())
    .use(employeeRouter)
    .use(vacationRouter)

export default app;