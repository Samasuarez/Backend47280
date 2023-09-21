import { Router } from "express";

const routerAdmin = Router();

routerAdmin.get("/admin", (req, res) => {
  const user = req.session.user;

  if (user && user.rol === "admin") {
    res.render("admin_dashboard", { user });
  } else {
    res.redirect("/productos");
  }
});

export default routerAdmin;
