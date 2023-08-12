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
    this.path = path;
    this.pathproducts = "./models/products.json";
    // this.carts = [];
  }

  async createCart() {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const newCart = new Cart();
      carts.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
      console.log(`Carrito ${newCart.id} creado con éxito.`);
      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito", error);
    }
  }

  async getCartId(id) {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const cartId = carts.find((c) => c.id === id);
      if (cartId) {
        return cartId;
      } else {
        console.log("Carrito no encontrado");
        return null;
      }
    } catch (error) {
      console.log("Error al cargar el carrito:", error.message);
      return null;
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
