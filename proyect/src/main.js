const fs = require("fs").promises;
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  getProducts = async () => {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    try {
      console.log(products);
    } catch {
      console.log("error al cargar los productos");
    }
  };

  addProducts = async (product) => {
    const product = new Product({
      title,
      price,
      stock,
      thumbnail,
      code,
      description}
    );
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    if (products.find((producto) => producto.id == product.id)) {
      return "producto agregado";
    }
    products.push(product);
    await fs.writeFile(this.path, (JSON.stringify(this.products)));
  };

  getProductById = async (id) => {
    const products = JSON.parse(await fs.readFile( this.path , 'utf-8'))
    const prod = products.find(producto => producto.id === id)
    if (prod) {
        console.log(prod)
    } else {
        console.log("Producto no existe")
    }
}

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
