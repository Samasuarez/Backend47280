import { Router } from "express";
import userModel from "../models/users.model.js";
const routerUser = Router();

routerUser.post("/", async (req, res) => {
  const { first_name, last_name, email, password, age, rol } = req.body;
  try {
    const response = await userModel.create({
      first_name,
      last_name,
      email,
      password,
      age,
      rol: rol || "usuario",
    });
    res.status(200).send({ message: "Usuario creado", respuesta: response });
  } catch (error) {
    res.status(400).send({ error: `Error en create user: ${error}` });
  }
});

export default routerUser;
