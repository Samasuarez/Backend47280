import { io } from "socket.io-client";
const socket = io();

const newProductForm = document.getElementById("new-product-form");
socket.on("nuevoProducto", (nuevoProducto) => {
  displayProduct(nuevoProducto);
});

newProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    price: parseFloat(document.getElementById("price").value),
    thumbnail: document.getElementById("thumbnail").value,
    stock: parseInt(document.getElementById("stock").value),
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    code: parseInt(document.getElementById("code").value),
  };
  // newProductForm.onreset();
  if (!validateFormData(formData)) {
    console.log("Campos obligatorios incompletos");
    return;
  }

  try {
    const response = await fetch("/realtimeproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newProduct = await response.json();
      console.log("Nuevo producto enviado:", newProduct);

      // newProductForm.reset();
    }
  } catch (error) {
    console.error("Error al enviar el producto", error);
  }
});
// displayProduct(newProduct)

function displayProduct(product) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  const title = document.createElement("h3");
  title.textContent = product.title;
  productCard.appendChild(title);
  title.textContent = product.title;
  productCard.appendChild(title);
  const price = document.createElement("p");
  price.textContent = `Precio: $${product.price}`;
  productCard.appendChild(price);
  const stock = document.createElement("p");
  stock.textContent = product.stock;
  productCard.appendChild(stock);
  const thumbnailImg = document.createElement("img");
  thumbnailImg.src = product.thumbnail;
  productCard.appendChild(thumbnailImg);
  const description = document.createElement("p");
  description.textContent = product.description;
  productCard.appendChild(description);
  const category = document.createElement("p");
  category.textContent = product.category;
  productCard.appendChild(category);
  const code = document.createElement("p");
  code.textContent = product.code;
  productCard.appendChild(code);
  const productsList = document.querySelector(".products-container");
  productsList.appendChild(productCard);
}
socket.on("nuevoProducto", (newProduct) => {
  displayProduct(newProduct);
});