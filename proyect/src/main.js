import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerRealTime from "./routes/realTimeProducts.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";

const app = express();
const port = 4000;

const server = app.listen(port, () => {
  console.log(`server on port ${port}`);
});
const io = new Server(server);
app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.on("connection", (socket) => {
  console.log("conectado a servidor io");

  socket.on("nuevoProducto", async (nuevoProducto) => {
    try {
      io.emit("nuevoProducto", nuevoProducto);
    } catch (error) {
      console.log("Error al emitir el evento", error);
    }
  });
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/realtimeproducts", routerRealTime);
app.use("/products", routerProduct);
app.use("/carts", routerCart);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));

app.get("/static", (req, res) => {
  res.render("home");
});
// export { app, server, io };
