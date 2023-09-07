import { Router } from "express";
import productModel from "../models/products.model.js";

const routerProduct = Router();
routerProduct.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send(prods);
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos: ${error}` });
  }
});

routerProduct.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ resultado: "OK", message: prod });
    } else {
      res.status(404).send({ resultado: "Not Found", message: prod });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
});

routerProduct.post("/", async (req, res) => {
  const { title, description, price, stock, category, code, thumbnails } =
    req.body;
  try {
    const success = await productModel.create(
     { title,
      description,
      price,
      stock,
      category,
      code,
      thumbnails}
    );

    res
      .status(201)
      .json(success);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
  }
});

routerProduct.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, stock, thumbnail, description, category, code } =
    req.body;
  try {
    await productModel.findByIdAndUpdate(id, {
      title,
      price,
      stock,
      thumbnail,
      description,
      category,
      code,
    });
    if (prod) {
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } else {
      res.status(404).send({ resultado: "Not Found", message: respuesta });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al actualizar producto: ${error}` });
  }
});

routerProduct.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const success = await productModel.findByIdAndDelete(id);
    if (prod) {
      res.status(200).send({ resultado: "OK", message: success });
    } else {
      res.status(404).send({ resultado: "OK", message: success });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});

export default routerProduct;
