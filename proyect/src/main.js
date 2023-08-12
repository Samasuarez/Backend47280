import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/products", routerProduct);
app.use("/carts", routerCart);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));

app.get("/static", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
