import "dotenv/config";
import express from "express";
import session from "express-session";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import {mongoConnect, sessionStore} from "./db/index.js";
import path from "path";
import cookieParser from "cookie-parser";
import routerSession from "./routes/session.routes.js";
import routerUser from "./routes/users.routes.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerRealTime from "./routes/realTimeProducts.routes.js";
import routerAdmin from "./routes/admin.routes.js";


const app = express();
const port = 4000;
function checkUserRole(role) {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user || user.rol !== role) {
      return res.status(403).send("Access Denied");
    }

    next();
  };
}

mongoConnect();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));

app.use(express.json());
app.use(cookieParser());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", checkUserRole("admin"), routerAdmin);
app.use("/session", routerSession);
app.use("/users", routerUser);
app.use("/realtimeproducts", routerRealTime);
app.use("/products", routerProduct);
app.use("/carts", routerCart);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Has entrado ${req.session.counter} veces a mi pagina`);
  } else {
    req.session.counter = 1;
    res.send("Hola, por primera vez");
  }
});

app.get("/login", (req, res) => {
  const { email, password } = req.body;

  req.session.email = email;
  req.session.password = password;

  return res.send("Usuario logueado");
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/");
  });
});

const server = app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected to io server");
  socket.on("disconnect", () => {
    console.log("Disconnected from io server");
  });
});
