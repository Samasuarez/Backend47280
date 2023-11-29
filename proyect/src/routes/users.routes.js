import { Router } from "express";
import passport from "passport";
import { postUser } from "../controllers/users.controlers.js";
const routerUser = Router();

routerUser.post("/", passport.authenticate("register"),postUser )

export default routerUser;
