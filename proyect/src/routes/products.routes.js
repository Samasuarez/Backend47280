import { Router } from "express";

import ProductManager from "../controllers/ProductManager.js";

const productManager = new ProductManager("./models/products.json");
const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || -1;
    const products = await productManager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al cargar productos" });
  }
});



routerProduct.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send({ message: `Producto ${productId} no encontrado` });
    }
  } catch (error) {
    console.log("error");
  }
});

routerProduct.post("/", async (req, res) => {
  const { title, price, stock, thumbnail, description, category, code } =
    req.body;

  try {
    const product = await productManager.addProduct(
      title,
      price,
      stock,
      thumbnail,
      description,
      category,
      code
    );

    res.status(201).json({ message: "Producto agregado exitosamente", product });
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
  }
});

routerProduct.put("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedFields = req.body;

  await productManager.updateProduct(productId, updatedFields);

  res.status(200).json({ message: "Producto actualizado correctamente" });
});

routerProduct.delete("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);

  const success = await productManager.deleteProduct(productId);

  if (success) {
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

export default routerProduct;
