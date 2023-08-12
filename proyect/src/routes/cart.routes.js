import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartManager = new CartManager("./models/carts.json");
const routerCart = Router();

routerCart.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).send("Error al crear el carrito: " + error.message);
  }
});

routerCart.get("/:cid", async (req, res) => {
  try {
    const cartCid = parseInt(req.params.cid);
    const cart = await cartManager.getCartId(cartCid);
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(400).send(`Error: Carrito ${cartCid} no encontrado`);
    }
  } catch (error) {
    console.log("Error al buscar carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    await cartManager.addToCart(cartId, productId);
    res.status(200).send("Producto agregado al carrito exitosamente.");
  } catch (error) {
    res
      .status(500)
      .send("Error al agregar el producto al carrito: " + error.message);
  }
});

export default routerCart;
