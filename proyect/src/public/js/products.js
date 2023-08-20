const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const products = [...products];

  products.forEach((product) => {
    const productHTML = `
            <li>
                <h2>${product.title}</h2>
                <p>Precio: ${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Descripción: ${product.description}</p>
                <img src="/public/${product.thumbnail}" alt="${product.title}">
            </li>
        `;
    productList.insertAdjacentHTML("beforeend", productHTML);
  });
});
