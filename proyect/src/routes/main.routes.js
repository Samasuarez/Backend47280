import { Router } from "express";
import routerSession from "./session.routes.js";
import routerUser from "./users.routes.js";
import routerProduct from "./products.routes.js";
import routerCart from "./cart.routes.js";
import loggerRoutes from "./logger.routes.js";
// import routerRealTime from "./realTimeProducts.routes.js";

const router = Router();

router.use("/products", routerProduct);
router.use("/users", routerUser);
router.use("/carts", routerCart);
router.use("/session", routerSession);
router.use("/logger", loggerRoutes)
// router.use("/realtimeproducts", routerRealTime);

export default router;
