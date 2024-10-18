import { Router } from 'express';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js'; 

const router = Router();

// Ruta para mostrar todos los productos
router.get('/products', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Convertir los parámetros a números
        const limitNumber = parseInt(limit);
        const pageNumber = parseInt(page);
        
        // Obtener productos con paginación
        const products = await Product.find()
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber);
        
        const total = await Product.countDocuments(); // Total de productos
        const totalPages = Math.ceil(total / limitNumber); // Total de páginas

        res.render('index', {
            products,
            hasPrevPage: pageNumber > 1,
            hasNextPage: pageNumber < totalPages,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null,
            nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
            page: pageNumber,
            totalPages
        });
    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
});

// Ruta para ver los detalles del producto
router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findById(pid);
        if (!product) return res.status(404).send('Producto no encontrado');
        res.render('product', { product });
    } catch (error) {
        res.status(500).send('Error al obtener el producto');
    }
});

// Ruta para mostrar el carrito
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await Cart.findById(cid).populate('products.productId'); // Asegúrate de que el campo sea 'productId'
        if (!cart) return res.status(404).send('Carrito no encontrado');

        res.render('cart', {
            cart
        });
    } catch (error) {
        res.status(500).send('Error al obtener el carrito');
    }
});

export default router;
