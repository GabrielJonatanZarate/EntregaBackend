import express from 'express';
import { getAllProducts } from './products.routes.js';

const router = express.Router();

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {}); // Renderiza la vista de realTimeProducts
});

// Ruta para la página de inicio 
router.get('/home', (req, res) => {
    const allProducts = getAllProducts(); // Llama a la función
    res.render('home', { products: allProducts }); // Renderiza la vista de home
});

// Ruta para la vista principal
router.get('/', (req, res) => {
    res.render('index', {}); // Renderiza index.handlebars
});

export default router;