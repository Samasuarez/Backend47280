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

    if (product === "Producto ya agregado") {
      res.status(400).json({ error: product });
    } else {
      res.status(201).json({ message: "Producto agregado exitosamente" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
  }
});

routerProduct.delete("/:id", async (req, res) => {
  try {
    const confirmacion = await productManager.deleteProduct(req.params.id);

    if (confirmacion) {
      res(200).send("Producto eliminado correctamente");
    } else {
      res(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);

    res(500).send("Error interno del servidor");
  }
});

export default routerProduct;
