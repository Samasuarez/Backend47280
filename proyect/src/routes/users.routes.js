import { Router } from "express";
import userModel from "../models/users.model.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";

const routerUser = Router();

routerUser.post("/",  passport.authenticate('register'),async (req, res) => {
  const { first_name, last_name, email, password, age} = req.body;
  try {
    const hashPassword = createHash(password)
    const response = await userModel.create({
      first_name : first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
      age: age,
    
    });
    res.status(200).send({ message: "Usuario creado", respuesta: response });
  } catch (error) {
    res.status(400).send({ error: `Error en create user: ${error}` });
  }
});
// routerUser.post()

export default routerUser;
