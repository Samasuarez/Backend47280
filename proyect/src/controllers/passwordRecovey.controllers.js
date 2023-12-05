import { generateToken } from "../utils/jwt.js";
import { sendRecoveryEmail } from "../utils/emailRecov.js";
import PasswordRecovery from "../models/passwordRecovery.model.js";

export const requestPasswordRecovery = async (req, res) => {
  try {
    const token = generateToken({ email: req.body.email }, "1h");
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000);

    await PasswordRecovery.create({
      userEmail: req.body.email,
      token,
      expirationDate,
    });

    sendRecoveryEmail(req.body.email, token);

    res
      .status(200)
      .json({ message: "Correo de recuperación enviado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al procesar la solicitud de recuperación" });
  }
};

export const resetPass = async (req, res) => {
  const { token } = req.params;
  const { newPassword, oldPassword, code } = req.body;
  try {
    const linkData = recoveryLinks[token];
    console.log(token);
    if (linkData && Date.now() - linkData.timestamp <= 3600000) {
      const { email } = linkData;

      console.log(email);
      console.log(newPassword);
      console.log(oldPassword);

      delete recoveryLinks[token];

      res.status(200).send("Contraseña modificada correctamente");
    } else {
      res.status(400).send("Token invalido o expirado. Pruebe nuevamente");
    }
  } catch (error) {
    res.status(500).send("Error al cambiar contraseña de cliente: ", error);
  }
};
