import { Router } from "express";
import routerSession from "./session.routes.js";
import routerUser from "./users.routes.js";
import routerProduct from "./products.routes.js";
import routerCart from "./cart.routes.js";
import loggerRoutes from "./logger.routes.js";
import recovPassRoter from "./passwordRec.routes.js"
// import routerRealTime from "./realTimeProducts.routes.js";

const router = Router();

router.use("/api/products", routerProduct);
router.use("/api/users", routerUser);
router.use("/api/carts", routerCart);
router.use("/api/session", routerSession);
router.use("/api/logger", loggerRoutes)
router.use("/api/recoveryPassword", recovPassRoter)
// router.use("/realtimeproducts", routerRealTime);

export default router;
