import { Router } from "express";
import {getProducts , deleteProduct, createProducts , putProducts} from "../controllers/products.controllers.js"

const routerProduct = Router();

routerProduct.get("/", getProducts);
routerProduct.delete("/", deleteProduct)
routerProduct.put("/", putProducts)
routerProduct.post("/", createProducts)

// routerProduct.post("/", passportError("jwt"), authorization("admin"), async (req, res) => {
// });

export default routerProduct;
