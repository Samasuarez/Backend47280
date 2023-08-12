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
  const cartId = parseInt(req.params.cid); 
  const productId = parseInt(req.params.pid);

  try {
    const result = await cartManager.addToCart(cartId, productId);

    if (
      result === "Producto no encontrado" ||
      result === "Carrito no encontrado"
    ) {
      res.status(400).json({ message: result });
    } else {
      res.status(200).json({ message: result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar el producto al carrito: " + error.message,
    });
  }
});


export default routerCart;
