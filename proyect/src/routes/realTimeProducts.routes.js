import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const routerRealTime = Router();
const productManager = new ProductManager("./models/products.json");

routerRealTime.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).render("realTimeProducts.handlebars", { products });
  } catch (error) {
    console.log("Error al cargar los productos");
    res.status(400).send({ error: "Error al cargar los productos" });
  }
});

routerRealTime.post("/", async (req, res) => {
  const { title, price, stock, thumbnail, description, category, code } = req.body;

  try {
    const newProduct = await productManager.addProduct(
      title,
      price,
      stock,
      thumbnail,
      description,
      category,
      code
    );

    if (newProduct === "Producto ya agregado") {
      return res.status(400).json({ error: "Producto ya agregado" });
    }

    // Emitir el evento a través de la instancia de io
    req.app.get("io").emit("nuevoProducto", newProduct);

    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.log("Error al crear el producto", error);
    res.status(400).json({ error: "Error al crear el producto" });
  }
});






export default routerRealTime;
