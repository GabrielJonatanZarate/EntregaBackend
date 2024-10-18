import { Router } from 'express';
import Product from '../models/product.model.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Obtener productos con filtros, paginación y ordenamiento
router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query, availability } = req.query;

    // Convertir los parámetros a números
    const limitNumber = parseInt(limit);
    const pageNumber = parseInt(page);
    
    // Crear un objeto de filtro
    const filter = {};
    if (query) {
        const regex = new RegExp(query, 'i'); // Búsqueda insensible a mayúsculas
        filter.title = regex; // Buscar por título
    }

    // Filtrar por categoría
    if (availability) {
        filter.stock = availability === 'true' ? { $gt: 0 } : 0; // Disponibilidad
    }

    // Crear opciones de paginación y ordenamiento
    const options = {
        limit: limitNumber,
        skip: (pageNumber - 1) * limitNumber,
        sort: {}
    };

    // Ordenamiento por precio
    if (sort) {
        const [sortField, sortOrder] = sort.split(':'); // Espera "campo:orden" (ejemplo: "price:asc")
        options.sort[sortField] = sortOrder === 'desc' ? -1 : 1;
    }

    try {
        const products = await Product.find(filter, null, options);
        const total = await Product.countDocuments(filter); // Total de documentos que cumplen con el filtro

        const totalPages = Math.ceil(total / limitNumber);
        const hasPrevPage = pageNumber > 1;
        const hasNextPage = pageNumber < totalPages;

        res.json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage: hasPrevPage ? pageNumber - 1 : null,
            nextPage: hasNextPage ? pageNumber + 1 : null,
            page: pageNumber,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${pageNumber - 1}&sort=${sort}&query=${query}&availability=${availability}` : null,
            nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${pageNumber + 1}&sort=${sort}&query=${query}&availability=${availability}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Error al obtener productos' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, price, stock, category } = req.body;

    try {
        const newProduct = new Product({
            id: uuidv4(), // Generar un ID único
            title,
            description,
            price,
            stock,
            category
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el producto' });
    }
});

// Obtener un producto específico por su ID
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updateData = req.body;

    try {
        const product = await Product.findByIdAndUpdate(pid, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el producto' });
    }
});

// Eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await Product.findByIdAndDelete(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;
