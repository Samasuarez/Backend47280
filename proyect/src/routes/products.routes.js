import { Router } from "express";
import {getProducts , deleteProduct, createProducts , putProductsById , getProductsById} from "../controllers/products.controllers.js"
import { passportError, authorization } from "../utils/messagesError.js";
const routerProduct = Router();

routerProduct.get("/", getProducts);
routerProduct.get('/:id',getProductsById )
routerProduct.post("/",passportError("jwt"), authorization("user"), createProducts)
routerProduct.put("/:id",passportError("jwt"), authorization("Admin"),  putProductsById)
routerProduct.delete("/:id",passportError("jwt"), authorization("Admin"), deleteProduct)


export default routerProduct;
