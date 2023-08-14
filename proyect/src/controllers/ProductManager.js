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
    await fs.writeFile(this.path, JSON.stringify(products));
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const productIndex = products.findIndex((prod) => prod.id === id);

      if (productIndex !== -1) {
        const { id, ...fieldsToUpdate } = updatedFields;
        Object.assign(products[productIndex], fieldsToUpdate);
        await fs.writeFile(this.path, JSON.stringify(products));
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const newProducts = products.filter((prod) => prod.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newProducts));
      return true;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return false;
    }
  }
}

export default ProductManager;
