import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
const routerRealTime = Router();
const productManager = new ProductManager('./models/products.json');
// import { io } from "../main.js";

routerRealTime.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts(); 
    res.status(200).render("realTimeProducts.handlebars", { products }); 

    // io.emit("updateProducts", products);
  } catch (error) {
    console.log("error al cargar los productos");
    res.status(400).send({ error: "error al cargar los productos" });
  }
});

export default routerRealTime