import { Router } from "express";
import  userModel  from "../models/users.model.js";

const routerSession = Router();

routerSession .post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.session.login) {
      return res.status(200).send({ resultado: "Login ya existente" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        req.session.login = true;
        req.session.user = user;

        
        res.redirect("/productos");
      } else {
        res
          .status(401)
          .send({
            resultado: "Unauthorized",
            message: "Contraseña incorrecta",
          });
      }
    } else {
      res
        .status(404)
        .send({ resultado: "Not Found", message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ error: `Error en login: ${error.message}` });
  }
});

routerSession .get("/logout", async (req, res) => {
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
 export default routerSession