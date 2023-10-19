import { Router } from "express";
import {
  getCarts,
  getCartsbyCid,
  putCartbyCidAndPid,
  putByCid,
  postCartByCidAndPid,
  deleteByCidAndPid,
  deleteByCid,
  postCart
} from "../controllers/carts.constrollers.js";
const routerCart = Router();

routerCart.get("/", getCarts);
routerCart.get("/:cid" , getCartsbyCid)
routerCart.post("/", postCart)
routerCart.post("/:cid/products/:pid", postCartByCidAndPid)
routerCart.put("/:cid", putByCid )
routerCart.put("/:cid/products/:pid", putCartbyCidAndPid)
routerCart.delete("/:cid", deleteByCid)
routerCart.delete("/:cid:products/pid", deleteByCidAndPid)


export default routerCart;
