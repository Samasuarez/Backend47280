import { promises as fs } from "fs";

class Cart {
  static quantityIncrement = 1;
  static idIncrement = 1;
  constructor() {
    this.id = Cart.idIncrement++;
    this.quantity = Cart.quantityIncrement++;
  }
}

class CartManager {
  constructor(path) {
    this.path;
    this.pathproducts = "./models/products.json";
    this.carts = [];
  }

  async createCart(id) {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      const newCart = new Cart(id, products, quantity);
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      console.log(`carrito ${id} creado con exito.`);
    } catch (error) {
      console.error("error al creae el carrito", error);
    }
  }

  async getCartId() {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const cartId = carts.find((c) => c.id === id);
      if (cartId) {
        return cartId;
      } else {
        console.log("carrito no encontrado");
      }
    } catch (error) {
      console.log({ error: "error al cargar el carrito" });
    }
  }


  async addToCart(cartId, productId) {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const products = JSON.parse(
        await fs.readFile(this.pathProducts, "utf-8")
      );

      const cart = carts.find((c) => c.id === cartId);
      if (!cart) {
        console.log("Carrito no encontrado");
        return;
      }

      const product = products.find((p) => p.id === productId);
      if (!product) {
        console.log("Producto no encontrado");
        return;
      }

      const cartProduct = cart.products.find((p) => p.product === productId);
      if (cartProduct) {
        cartProduct.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.log("Error al agregar al carrito", error);
    }
  }
}
export default CartManager;
