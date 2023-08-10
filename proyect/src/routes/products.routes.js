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
  const { title, price, code, stock, thumbnail, description } = req.body;
  try {
    const product = await productManager.addProducts(
      title,
      price,
      code,
      stock,
      thumbnail,
      description
    );
    if (product === "Producto ya agregado") {
      res.status(400).json({ error: result });
    } else {
      res.status(201).json({ message: `Producto agregado exitosamente` });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
  }
});
 export default routerProduct