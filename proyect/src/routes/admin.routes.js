import { Router } from "express";

const routerAdmin = Router();

routerAdmin.get("/", (req, res) => {
  if (req.session.login && req.session.user.rol === "admin") {
    res.render("admin");
  } else {
    res.redirect("/login");
  }
});

export default routerAdmin;
