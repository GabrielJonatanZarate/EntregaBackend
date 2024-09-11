import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

let products = [];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const prodId = req.params.id;
    const prod = products.find(prod => prod.id === prodId)

    if (!prod) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(prod);
});

router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ error: 'Datos invalidos' })
    }

    const newProd = {
        id: uuidv4(),
        title: "remera",
        description: "xl",
        code: "08b08b",
        price: 20,
        status: true,
        stock: 50,
        category: "ropa"
    };

    products.push(newProd);
    res.status(201).json(newProd);
});

router.put('/:pid', (req, res) => {
    const prodId = req.params.id;
    const { title, description, code, price, status, stock, category } = req.body;
    const prodIndex = products.findIndex(prod => prod.id === prodId)

    if( prodIndex === -1){
        return res.status(404).json({error: 'Producto no encontrado'});
    }

    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ error: 'Datos invalidos' })
    }
    products[prodIndex] = {
        ...products[prodIndex],
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    }
    res.json(products[prodIndex]);
})

router.delete('/:pid', (req, res) => {
    const prodEliminar = req.params.id;
    const prodIndex = products.findIndex(prod => prod.id === prodEliminar);

    if(prodIndex === -1){
        return res.status(404).json({error: 'Producto no encontrado'});
    }

    products.slice(prodIndex, 1);
    res.status(204).json({mensaje: 'Producto eliminado'});
})

export default router;