const socket = io();
socket.on('updateProducts', (products) => {
  const productsList = document.getElementById('products-list');
  productsList.innerHTML = ''; 
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = product.thumbnail;
    productCard.appendChild(thumbnailImg);

    const title = document.createElement('h3');
    title.textContent = product.title;
    productCard.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `Precio: $${product.price}`;
    productCard.appendChild(price);
    productsList.appendChild(productCard);
  });
});


