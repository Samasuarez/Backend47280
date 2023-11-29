import { Router } from "express";
import passport from "passport";
// import { passportError, authorization } from "../utils/messagesError.js";
import {
  postSession,
  logoutSession,
} from "../controllers/session.controllers.js";

const routerSession = Router();

routerSession.post("/login", passport.authenticate("login"), postSession);
routerSession.get("/logout", logoutSession);

// routerSession.get(
//   "/current",
//   passportError("jwt"),
//   authorization("User"),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

export default routerSession;
