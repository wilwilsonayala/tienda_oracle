// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el formulario y la lista de productos
    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
  
    // Evento para manejar el envío del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita el reinicio de la página
  
      // Capturamos los valores de los campos
      const name = document.getElementById('product-name').value;
      const price = document.getElementById('product-price').value;
      const imageFile = document.getElementById('product-image').files[0];
  
      // Validamos los campos
      if (!name || !price || !imageFile) {
        alert('Por favor, completa todos los campos');
        return;
      }
  
      // Crear una URL para la imagen seleccionada
      const imageUrl = URL.createObjectURL(imageFile);
  
      // Crear un nuevo producto
      const product = document.createElement('div');
      product.classList.add('product');
      product.innerHTML = `
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
        <p>$ ${parseFloat(price).toFixed(2)}</p>
        <button class="delete-btn">🗑️</button>
      `;
  
      // Agregar el producto a la lista
      productList.appendChild(product);
  
      // Limpiar el formulario
      form.reset();
  
      // Agregar evento para eliminar productos
      product.querySelector('.delete-btn').addEventListener('click', () => {
        productList.removeChild(product);
      });
    });
  });
  