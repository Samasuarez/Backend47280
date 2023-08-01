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

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(products);
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
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = products.find((producto) => producto.id === id);
    if (prod) {
      console.log(prod);
    } else {
      console.log("Producto no existe");
    }
  }
}
const productManager = new ProductManager("./files/products.json");
 const prod1 = new Product("Product 1", 10.99, "P1", 100, "thumbnail1.jpg", "Description 1")
 productManager.addProducts(prod1);
productManager.getProducts()
