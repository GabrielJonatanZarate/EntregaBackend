import express from 'express';
import carts from './routes/carts.js';
import products from './routes/products.js';

app.listen(8080, () => {
    console.log("Servidor escuchando");
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/products', products)
app.use('/carts', carts)