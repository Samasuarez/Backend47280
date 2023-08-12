import { Router } from 'express'
import CartManager from "../controllers/CartManager.js";

const cartManager = new CartManager("./models/carts.json");
const routerCart = Router();

routerCart.post("/", async (req, res) => {
  const { id, quantity } = req.params;
  try {
    const newCart = await cartManager.createCart({
      id,
      quantity,
      products: [],
    });
    if (newCart) {
      res.status(200).send("carrito creado exitosamente");
    } else {
      res.status(400).send("");
    }
  } catch (error) {}
});

routerCart.get("/:cid", async (req, res) => {
  try {
    const cartCid = parseInt(req.params.cid);
    const cart = await cartManager.getCartCid(cartCid);
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(400).send(`error carrito ${cartCid} no encontrado`);
    }
  } catch (error) {
    console.log("error carrito no encontrado", error);
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
