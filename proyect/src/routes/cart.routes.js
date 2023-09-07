import { Router } from "express";
import cartModel from "../models/carts.model.js";

const routerCart = Router();

routerCart.post("/", async (req, res) => {
  const { products } = req.body;
  try {
    const newCart = await cartModel.create( products );
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send("Error al crear el carrito: " + error.message);
  }
});
routerCart.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(400).send(`Error: Carrito ${cid} no encontrado`);
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
    const result = await cartModel.create(cartId, productId);

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

routerCart.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const success = await cartModel.findByIdAndDelete(cid)
    if (cart) {
      res.status(200).send({ resultado: "OK", message: success })

    } else {
      res.status(404).send({ resultado: 'Not Found', message: success })
    }
  } catch (error) {
    res.status(400).send({error: `error al eliminar carrito ${error}`})
  }
});

export default routerCart;
