import { Router } from "express";
import passport from "passport";
import {passportError, authorization} from "../utils/messagesError.js"
const routerSession = Router();

routerSession.post('/login', passport.authenticate('login'), async (req, res) => {
  try {
      if (!req.user) {
          return res.status(401).send({ mensaje: "Invalidate user" })
      }

      req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          age: req.user.age,
          email: req.user.email
      }

      res.status(200).send({ payload: req.user })
  } catch (error) {
      res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
  }
})
routerSession.get('/current', passportError("jwt"), authorization("user"),  (req, res) => {
  res.send(req.user)

})

routerSession.get("/logout", async (req, res) => {
  try {
    if (req.session.login) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al cerrar la sesión:", err);
          res.status(500).send({ error: "Error al cerrar la sesión" });
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).send({ error: `Error en logout: ${error.message}` });
  }
});
export default routerSession;
