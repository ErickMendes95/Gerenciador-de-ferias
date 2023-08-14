import supertest from "supertest";
import app from "../app";
import { cleanDb } from "./helpers";

beforeAll(async () => {
    await cleanDb();
})