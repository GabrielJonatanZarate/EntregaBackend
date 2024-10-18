import { Router } from 'express';
import Cart from '../models/cart.model.js'; 

const router = Router();

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(product => product.productId.toString() !== pid);
        await cart.save();

        res.json({ message: 'Producto eliminado del carrito', products: cart.products });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
});

// Actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body; // Espera un arreglo de productos con { productId, quantity }

    try {
        const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

// Actualizar solo la cantidad de ejemplares de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const productInCart = cart.products.find(product => product.productId.toString() === pid);
        if (productInCart) {
            productInCart.quantity = quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
    }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        cart.products = [];
        await cart.save();

        res.json({ message: 'Todos los productos han sido eliminados del carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar productos del carrito' });
    }
});

// Obtener todos los productos del carrito con populate
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid).populate('products.productId'); 
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

export default router;

