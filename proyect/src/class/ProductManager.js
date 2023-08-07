const fs = require("fs").promises;

class Product {
  static idIncrement = 1;

  constructor(title, price, code, stock, thumbnail, description) {
    this.id = Product.idIncrement++;
    this.title = title;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.description = description;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async getProducts(limit) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    if (limit !== -1) {
      return products.slice(0, limit);
    }
    return products;
  }

  async addProducts(title, price, code, stock, thumbnail, description) {
    const product = new Product(
      title,
      price,
      code,
      stock,
      thumbnail,
      description
    );
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    if (products.find((producto) => producto.id === product.id)) {
      return "Producto ya agregado";
    }
    products.push(product);
    await fs.writeFile(this.path, JSON.stringify(products));
  }

  async getProductById(id) {
    try {
      const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const prod = products.find((producto) => producto.id === id);
      if (prod) {
        return prod;
      } else {
        console.log("Producto no existe");
      }
    } catch (error) {
      console.log({ error: "Error al cargar productos" });
    }
  }

  async updateProduct(id, { nombre }) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = products.findIndex((prod) => prod.id === id);
    if (indice != -1) {
      products[indice].nombre = nombre;
      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  }
  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prods = products.filter((prod) => prod.id != id);
    await fs.writeFile(this.path, JSON.stringify(prods));
  }
}

module.exports = ProductManager;
