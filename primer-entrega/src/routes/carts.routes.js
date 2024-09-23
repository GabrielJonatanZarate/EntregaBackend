import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
let carts = [];

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {

    const newCart = {
        id: uuidv4(),
        products: []

    }

    carts.push(newCart);
    res.status(201).json(newCart);
});

// Ruta para obtener un carrito específico por su ID
router.get('/:cid', (req, res) => {
    const { cid } = req.params;

    const cart = carts.find(cart => cart.id === cid);

    if(!cart){
        return res.status(404).json({error: 'Carrito no encontrado'});
    }
    res.json(cart.products);
});

// Ruta para agregar un producto a un carrito específico
router.post('/:cid/product/:pid', (req, res) =>{
    const { cid, pid } =req.params;
    const cart = carts.find(cart => cart.id === cid);

    if(!cart) {
        return res.status(404).json({error: 'Carrito no encontrado'});
    }

    const productoExistente = cart.products.find(product => product.product === pid);

    if(productoExistente) {
        productoExistente.quantity += 1;
    }else {
        cart.products.push({
            product: pid,
            quantity: 1
        });
    }
    res.status(200).json(cart.products);
});


export default router;