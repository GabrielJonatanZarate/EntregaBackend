import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

let products = [];

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
    res.json(products);
});

// Ruta para obtener un producto específico por su ID
router.get('/:pid', (req, res) => {
    const prodId = req.params.pid;
    const prod = products.find(prod => prod.id === prodId)

    if (!prod) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(prod);
});

// Ruta para crear un nuevo producto
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

// Ruta para actualizar un producto existente
router.put('/:pid', (req, res) => {
    const prodId = req.params.pid;
    const { title, description, code, price, status, stock, category } = req.body;
    const prodIndex = products.findIndex(prod => prod.id === prodId)

    if (prodIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verifica que todos los campos sean proporcionados
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ error: 'Datos invalidos' })
    }
    products[prodIndex] = { // Actualiza el producto existente
        ...products[prodIndex], // Mantiene los datos existentes
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


// Ruta para eliminar un producto
router.delete('/:pid', (req, res) => {
    const prodEliminar = req.params.pid;
    const prodIndex = products.findIndex(prod => prod.id === prodEliminar);

    if (prodIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    products.splice(prodIndex, 1);
    res.status(204).json({ mensaje: 'Producto eliminado' });
})

export default router;