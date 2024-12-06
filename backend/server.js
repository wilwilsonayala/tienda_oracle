const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;


// Configuración de multer para cargar imágenes
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar colisiones
  },
});

const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simulación de base de datos en memoria
let productos = [
  { id: 1, name: 'Producto 1', price: 100, image: '/uploads/1733370171808.jpeg' },
  { id: 2, name: 'Producto 2', price: 200, image: '/uploads/default.jpg' },
];

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Obtener todos los productos
app.get('/products', (req, res) => {
  res.json(productos);
});

// Agregar un nuevo producto
app.post('/products', upload.single('product-image'), (req, res) => {
    console.log('/products', req.file);
    console.log('datos del producto', req.file);

  const { name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.jpg';
  const newProduct = { id: productos.length + 1, name, price, image };
  productos.push(newProduct);
  res.status(201).json(newProduct);
});

// Eliminar un producto por ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  productos = productos.filter((producto) => producto.id !== parseInt(id));
  res.status(204).send();
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
