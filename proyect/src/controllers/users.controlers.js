export const postUser = async () => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }
    return res.status(200).send({ mensaje: "Usuario creado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
  }
};
