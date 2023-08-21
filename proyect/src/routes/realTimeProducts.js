import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
const routerRealTime = Router();
const productManager = new ProductManager("./models/products.json");
// import { io } from "../main.js";

routerRealTime.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).render("realTimeProducts.handlebars", { products });
  } catch (error) {
    console.log("error al cargar los productos");
    res.status(400).send({ error: "error al cargar los productos" });
  }
});

routerRealTime.post("/", async (req, res) => {
  const { title, price, stock, thumbnail, description, category} =
    req.body;

  try {
   const newProduct = await productManager.addProduct({
      title,
      price,
      stock,
      thumbnail,
      description,
      category,
      // code,
    });

    req.app.get("io").emit("nuevoProducto", newProduct);
    const products = await productManager.getProducts();
    res.status(201).render("realTimeProducts.handlebars", { products });
  } catch (error) {
    console.log("Error al crear el producto");
    res.status(400).json({ error: "Error al crear el producto" });
  }
});

export default routerRealTime;
