import { promises as fs } from "fs";

class Cart {
  static quantityIncrement = 1;
  static idIncrement = 1;
  constructor() {
    (this.id = Cart.idIncrement++), (this.quantity = Cart.quantityIncrement++);
  }
}

class CartManager {
  constructor(path) {
    this.path;
    this.cart = [];
  }
  async getCart() {
    const cart = JSON.parse(await fs.readFile(this.path, "utf-8"));
    if (cart) {
      return cart;
    } else {
      console.log("error al cargar el carrito");
    }
  }
  async addCart(id, quantity) {
    const addProduct = new Cart(id, quantity);
    const 
  }
}
