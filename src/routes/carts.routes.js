import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// let products = [];
let carts = [];

router.post('/', (req, res)=>{
    const { products } = req.body;

    if(!products){
        return res.status(400).json('')
    }

    const cartProd = {
        id: uuidv4(),
        products
    }
    
    products.push(cartProd);
    res.status(201).json(cartProd);
});

router.get('/get:cid',(req ,res)=>{
    res.json(carts)
});

router.post('/:cid/product/:pid')


export default router;








//router.get('/', (req, res) => {
    //     res.json(carts);
    // });