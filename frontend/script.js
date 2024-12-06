document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const productList = document.getElementById('product-list');
  const API_URL = 'http://localhost:3000/products';

  // Cargar productos al inicio
  fetch(API_URL)
    .then(response => response.json())
    .then(products => {
      products.forEach(product => addProductToDOM(product));
    });

  // Manejar envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('product-image', image);

    fetch(API_URL, {
      method: 'POST',
      body: formData, // Usar FormData para enviar archivos
    })
      .then(response => response.json())
      .then(newProduct => addProductToDOM(newProduct));

    form.reset();
  });

  // Agregar producto al DOM
  const addProductToDOM = (product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <div class="product" id="product-${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
        <p>$${parseFloat(product.price).toFixed(2)}</p>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // Eliminar producto
    productElement.querySelector('.delete-btn').addEventListener('click', () => {
      fetch(`${API_URL}/${product.id}`, { method: 'DELETE' })
        .then(() => productList.removeChild(productElement));
    });

    productList.appendChild(productElement);
  };
});
