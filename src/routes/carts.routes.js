import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
let carts = [];

router.post('/', (req, res) => {
    const { products } = req.body;

    if (!carts.some(cart => cart.products === products)) {
        return res.status(400).json({ error: 'Producto existente' })
    }

    const cartProd = {
        id: uuidv4(),
        products: []

    }

    carts.push(cartProd);
    res.status(201).json(cartProd);
});

router.get('/get:cid', (req, res) => {
    const { cid } = req.params;

    const cart = cart.find(cart => cart.products === cid);

    if(!carts){
        return res.status(404).json({error: 'Carrito no encontrado'});
    }
    res.json(carts.products);
});

router.post('/:cid/product/:pid', (req, res) =>{
    const { cid, pid } =req.params;
    const cart = carts.find(cart => cart.products === cid);

    if(!cart) {
        return res.status(404).json({error: 'Carrito no encontrado'});
    }

    const productoExistente = cart.products.find(product => product.product === pid);

    if(productoExistente) {
        productoExistente.quantity += 1;
    }else {
        cart.product.push({
            product: pid,
            quantity: 1
        });
    }
    res.status(200).json(cart.products);
});


export default router;








//router.get('/', (req, res) => {
//     res.json(carts);
// });