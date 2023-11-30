import {Router} from "express";
import { loggerTest } from "../controllers/logger.controler.js";

const loggerRoutes = Router()

loggerRoutes.get("/loggerTest", loggerTest);

export default loggerRoutes