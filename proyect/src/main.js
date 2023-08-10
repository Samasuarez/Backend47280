import express from "express";
import routerProduct from "./routes/products.routes.js";
import { __dirname } from "./path.js";
import path from 'path'
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use("/products", routerProduct);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
