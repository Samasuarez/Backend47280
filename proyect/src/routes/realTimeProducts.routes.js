// import { Router } from "express";
// import ProductManager from "../controllers/ProductManager.js";

// const productManager = new ProductManager('./models/products.json')
// const routerRealTime = Router();

// routerRealTime.get("/", async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.status(200).render("realtimeproducts.handlebars", { products });
//   } catch (error) {
//     console.log("Error al cargar los productos");
//     res.status(400).send({ error: "Error al cargar los productos" });
//   }
// });

// routerRealTime.post("/", async (req, res) => {
//   const { title, price, stock, thumbnail, description, category, code } = req.body;

//   try {
//     const newProduct = await productManager.addProduct(
//       title,
//       price,
//       stock,
//       thumbnail,
//       description,
//       category,
//       code
//     );
 
   
//     // io.emit("nuevoProducto", newProduct); 
//     res.status(200).json(newProduct)
  
//   } catch (error) {
//     console.log("Error al crear el producto", error);
//     res.status(400).json({ error: "Error al crear el producto" });
//   }
// });

// export default routerRealTime;

