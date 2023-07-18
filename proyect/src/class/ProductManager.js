class Product {
  constructor(id, title, price, thumbnail, description, code, stock) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.description = description;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.currentId = 1;
  }

  addProduct(title, price, thumbnail, description, code, stock) {
    if (!title || !price || !thumbnail || !description || !code || !stock) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log(`Error: El producto con código "${code}" ya existe.`);
      return;
    }

    const product = new Product(
      this.currentId,
      title,
      price,
      thumbnail,
      description,
      code,
      stock
    );
    this.products.push(product);
    this.currentId++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  printProducts() {
    this.products.forEach((product) => {
      console.log("ID:", product.id);
      console.log("Title:", product.title);
      console.log("Price:", product.price);
      console.log("Thumbnail:", product.thumbnail);
      console.log("Description:", product.description);
      console.log("Code:", product.code);
      console.log("Stock:", product.stock);
      console.log("------------------------");
    });
  }
}
