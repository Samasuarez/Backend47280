import { Router } from "express";
import productModel from "../models/products.model.js";
import {passportError,authorization } from "../utils/messagesError.js"
const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
  try {
    const { category, availability, sortByPrice, sortOrder, page, limit } =
      req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (availability) {
      filter.status = availability === "available";
    }

    const sort = {};
    if (sortByPrice) {
      sort.price = sortOrder === "asc" ? 1 : -1;
    }

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    const products = await productModel.paginate(filter, {
      sort,
      ...options,
    });

    const response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.prevPage : null,
      nextPage: products.hasNextPage ? products.nextPage : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/products?page=${products.prevPage}&limit=${options.limit}`
        : null,
      nextLink: products.hasNextPage
        ? `/products?page=${products.nextPage}&limit=${options.limit}`
        : null,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ status: "error", error: `Error al consultar productos: ${error}` });
  }
});

routerProduct.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send(prod);
    } else {
      res.status(404).send({ resultado: "Not Found", message: prod });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
});

routerProduct.post("/", passportError("jwt"), authorization("Admin"), async (req, res) => {
  const { title, description, price, stock, category, code, thumbnails } =
    req.body;
  try {
    const success = await productModel.create({
      title,
      description,
      price,
      stock,
      category,
      code,
      thumbnails,
    });

    res.status(201).json(success);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
  }
});

routerProduct.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, stock, thumbnail, description, category, code } =
    req.body;
  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      price,
      stock,
      thumbnail,
      description,
      category,
      code,
    });
    if (prod) {
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } else {
      res.status(404).send({ resultado: "Not Found", message: respuesta });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al actualizar producto: ${error}` });
  }
});

routerProduct.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const success = await productModel.findByIdAndDelete(id);

    res.status(200).send({ resultado: "OK", prod: success });
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});

export default routerProduct;
