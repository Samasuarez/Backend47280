const express = require("express");
const ProductManager = require("./class/ProductManager");
const app = express();
const port = 4000;
const productManager = new ProductManager("./files/products.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("pagina de inicio");
});

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit || -1;
    const products = await productManager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar productos" });
  }
});
app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send({ message: `Producto ${productId} no encontrado` });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/products", async (req, res) => {
  const { title, price, code, stock, thumbnail, description } = req.body;
  try {
    const product = await productManager.addProducts(
      title,
      price,
      code,
      stock,
      thumbnail,
      description
    );
    if (product === "Producto ya agregado") {
      res.status(400).json({ error: result });
    } else {
      res.status(201).json({ message: "Producto agregado exitosamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al crear el producto" });
  }
});

// app.delete('/products', async (req, res)=>{

// })

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
