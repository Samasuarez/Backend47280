const express = require("express");
const ProductManager = require("./class/ProductManager");
const app = express();
const port = 4000;
const productManager = new ProductManager();
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  await res.send("pagina de inicio");
});

app.get("/products",(req, res) => {
 
});

app.listen(port, () => {
  console.log(`server on port ${port}`);
});