const fs = require("fs");
const path = require("path");
const { title } = require("process");

class ProductManager {
  constructor() {
    this.path = path;
    this.products = [];
  }

  getProducts = (products) => {
    try {
      products = JSON.stringify(fs.watchFile(this.path, "utf-8"));
      console.log(products);
    } catch {
      console.log("error al cargar los productos");
    }
  };

  addProducts = async (product) => {
    const product = new Product(
      title,
      price,
      stock,
      thumbnail,
      code,
      description
    );
    products = Json.parse(await fs.readFile("./products.txt", "utf-8"));
    if (products.find((producto) => producto.id == product.id)) {
      return "producto agregado";
    }
    products.push(product);
    await fs.writeFile("./products.txt"(JSON.stringify(this.products)));
  };
}

class Product {
  constructor(id, title, price, code, stock, thumbnail, description) {
    this.id = Product.incrementID();
    this.title = title;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.description = description;
  }
  static incrementID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      idIncrement = 1;
    }
    return this.idIncrement;
  }
}
