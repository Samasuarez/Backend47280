import {Router} from "express"
import routerSession from "./session.routes.js";
import routerUser from "./users.routes.js";
import routerProduct from "./products.routes.js";
import routerCart from "./cart.routes.js";
import routerRealTime from "./realTimeProducts.routes.js";
import routerAdmin from "./admin.routes.js";

 const router = Router()

 function checkUserRole(role) {
    return (req, res, next) => {
      const user = req.session.user;
  
      if (!user || user.rol !== role) {
        return res.status(403).send("Access Denied");
      }
  
      next();
    };
  }
  
router.use("/admin", checkUserRole("admin"), routerAdmin);
router.use("/session", routerSession);
router.use("/users", routerUser);
router.use("/realtimeproducts", routerRealTime);
router.use("/products", routerProduct);
router.use("/carts", routerCart);

 export default router
