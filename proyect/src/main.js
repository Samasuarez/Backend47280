import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerRealTime from "./routes/realTimeProducts.routes.js";

const app = express();
const port = 4000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home"); 
});
  
  app.use("/products", routerProduct);
app.use("/carts", routerCart);

const server = app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
const io = new Server(server);

app.use("/realtimeproducts", routerRealTime);

io.on("connection", (socket) => {
  console.log("Connected to io server");
  // socket.emit("nuevoProducto", (nuevoProducto) => {
  //   displayProduct(nuevoProducto);
  // });
  socket.on("disconnect", () => {
    console.log("Disconnected from io server");
  });
});
