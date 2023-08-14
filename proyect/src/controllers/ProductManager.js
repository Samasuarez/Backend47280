import { promises as fs } from "fs";
class Product {
  constructor(id, title, price, stock, thumbnail, description, category, code) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.description = description;
    this.status = true;
    this.category = category;
    this.code = code;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextProductId = 1;
  }
  async generateNewId() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    if (products.length > 0) {
      const lastProduct = products[products.length - 1];
      this.nextProductId = lastProduct.id + 1;
    }
  }
  async getProducts(limit) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    if (limit !== -1) {
      return products.slice(0, limit);
    }
    return products;
  }
  async addProduct(
    title,
    price,
    stock,
    thumbnail,
    description,
    category,
    code
  ) {
    await this.generateNewId();
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    if (products.find((producto) => producto.code === code)) {
      return "Producto ya agregado";
    }

    const product = new Product(
      this.nextProductId++,
      title,
      price,
      stock,
      thumbnail,
      description,
      category,
      code
    );

    products.push(product);
    // this.nextProductId++;
    await fs.writeFile(this.path, JSON.stringify(products));
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
    try {
      const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const prods = products.filter((prod) => prod.id != id);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }
}

export default ProductManager;
