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
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "error al cargar productos" });
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



app.listen(port, () => {
  console.log(`server on port ${port}`);
});
