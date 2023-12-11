import "dotenv/config";
import cors from "cors";
import express from "express";
import compression from "express-compression";
import router from "./routes/main.routes.js";
import session from "express-session";
import passport from "passport";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { mongoConnect, sessionStore } from "./db/index.js";
import path from "path";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.js";

const whiteList = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
};

const app = express();
const port = 4000;

app.use(compression());
app.use(cors(corsOptions));

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

app.get("/static", (req, res) => {
  res.render("home");
});
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use("/", router);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Error interno del servidor" });
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
