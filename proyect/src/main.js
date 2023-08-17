import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import { info } from "console";

const app = express();
const port = 4000;

const server = app.listen(port, () => {
  console.log(`server on port ${port}`);
});
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.on("connection", (socket) => {
  console.log("conectado a servidor io");

  socket.on("mensaje", (info) => {
    console.log(info);
    socket.emit("respuesta", true);
  });

  socket.on("productos", (infoProducts) => {
    if (infoProducts == "productos en tiempo real") {
      console.log("coneccion a productos en tiempo real");
    }
  });
});

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/products", routerProduct);
app.use("/carts", routerCart);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));

app.get("/static", (req, res) => {
  res.render("home");
});
