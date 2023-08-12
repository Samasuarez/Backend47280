import { promises as fs } from "fs";

class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }

  static getIncrementId(carts) {
    const maxId = carts.reduce(
      (max, cart) => (cart.id > max ? cart.id : max),
      0
    );
    return maxId + 1;
  }
}

class CartManager {
  constructor(path) {
    this.path = path;
    this.pathProducts = "./models/products.json";
  }

  async createCart() {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const newCartId = Cart.getIncrementId(carts);
      const newCart = new Cart(newCartId);
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
        return;
      }
    } catch (error) {
      console.log("Error al cargar el carrito:", error.message);
      return;
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
        return "Carrito no encontrado";
      }

      const product = products.find((p) => p.id === productId);
      if (!product) {
        return "Producto no encontrado";
      }

      const cartProduct = cart.products.find((p) => p.product === productId);
      if (cartProduct) {
        cartProduct.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
      return "Producto agregado al carrito exitosamente.";
    } catch (error) {
      throw new Error(`Error al agregar al carrito: ${error.message}`);
    }
  }
}
export default CartManager;
