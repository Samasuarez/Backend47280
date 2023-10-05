import { Router } from "express";
import passport from "passport";

const routerUser = Router();

routerUser.post("/", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    if (!user) {
      return res.status(400).send({ error: info.message });
    }
   
    res.status(200).send({ message: "Usuario creado", respuesta: user });
  })(req, res, next);
});



export default routerUser;
