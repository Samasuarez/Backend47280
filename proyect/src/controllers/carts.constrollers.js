import cartModel from "../models/carts.model.js";

export const postCart = async () => {
  const { products } = req.body;
  try {
    const newCart = await cartModel.create(products);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send("Error al crear el carrito: " + error.message);
  }
};

export const getCarts = async () => {
  const { limit } = req.params;
  try {
    const carts = await cartModel.find().limit(limit);
    res.status(200).send(carts);
  } catch (error) {
    res.status(400).send({ error: `error al cargar los carritos ${error}` });
  }
};

export const getCartsbyCid = async () => {
  const { cid } = req.params;
  try {
    const cart = await cartModel
      .findById(cid)
      .populate("products.id_prod", "-_id name price");

    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send(`Carrito ${cid} no encontrado`);
    }
  } catch (error) {
    console.error("Error al buscar carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const putCartbyCidAndPid = async () => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      cid,
      {
        $set: { "products.$[elem].quantity": quantity },
      },
      {
        new: true,
        arrayFilters: [{ "elem.id_prod": pid }],
      }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Cantidad de producto actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const putByCid = async () => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await cartModel.findByIdAndUpdate(cid, { products });
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).json({ error: `Carrito no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const postCartByCidAndPid = async () => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const existingProduct = cart.products.find(
      (product) => product.id_prod.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += 1;

      const updatedCart = await cartModel.findByIdAndUpdate(
        cid,
        { $set: { "products.$[elem].quantity": existingProduct.quantity } },
        {
          new: true,
          arrayFilters: [{ "elem.id_prod": pid }],
        }
      );

      return res.status(200).json({ respuesta: "OK", mensaje: updatedCart });
    } else {
      cart.products.push({ id_prod: pid, quantity: 1 });

      const updatedCart = await cartModel.findByIdAndUpdate(cid, cart);

      return res.status(200).json({ respuesta: "OK", mensaje: updatedCart });
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

export const deleteByCidAndPid = async () => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.id_prod.toString() === pid
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    cart.products.splice(productIndex, 1);

    const respuesta = await cartModel.findByIdAndUpdate(cid, cart);

    res.status(200).json({ respuesta: "OK", mensaje: respuesta });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al eliminar el producto del carrito" });
  }
};
export const deleteByCid = async () => {
  const { cid } = req.params;

  try {
    const deletedCart = await cartModel.findByIdAndRemove(cid);

    if (!deletedCart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Carrito y todos sus productos eliminados con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al eliminar el carrito y sus productos" });
  }
};
