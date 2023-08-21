const socket = io()

let products = [];
function displayProducts(products) {
  const productsList = document.getElementById("products-container");
  productsList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = product.thumbnail;
    productCard.appendChild(thumbnailImg);

    const title = document.createElement("h3");
    title.textContent = product.title;
    productCard.appendChild(title);

    const category = document.createElement("p");
    category.textContent = product.category;
    productCard.appendChild(category);

    const price = document.createElement("p");
    price.textContent = `Precio: $${product.price}`;
    productCard.appendChild(price);

    productsList.appendChild(productCard);
  });
}

socket.on("nuevoProducto", (nuevoProducto) => {
  products.push(nuevoProducto); 
  displayProducts(products); 
});

const newProductForm = document.getElementById("new-product-form");
newProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);
  const thumbnail = document.getElementById("thumbnail").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  // const code = parseInt(document.getElementById("code").value);

  if (!title || isNaN(price) || isNaN(stock) || !thumbnail || !category) {
    console.log("Campos obligatorios incompletos");
    return;
  }

  const nuevoProducto = {
    title,
    price,
    stock,
    thumbnail,
    description,
    category,
    // code,
  };

  socket.emit("nuevoProducto", nuevoProducto);

 
  newProductForm.reset();
});