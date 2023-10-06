import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { generateToken } from "../utils/jwt.js";
const routerSession = Router();

routerSession.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send({ mensaje: "Usuario no válido" });
      }

      if (req.user.email === "admin@coder.com") {
        req.user.rol = "admin";
      } else {
        req.user.rol = "usuario";
      }

      req.session.user = {
        email: req.user.email,
        password: req.user.password,
        rol: req.user.rol,
      };
      const token = generateToken(req.user);
      res.cookie("jwtCookie", token, {
        maxAge: 43200000,
      });
      res.status(200).send({ payload: req.user });
    } catch (error) {
      res.status(500).send({ mensaje: `Error al iniciar sesión ${error}` });
    }
  }
);

routerSession.get(
  "/current",
  passportError("jwt"),
  authorization("User"),
  (req, res) => {
    res.send(req.user);
  }
);

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
