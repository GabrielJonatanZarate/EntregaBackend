import express from 'express';
import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();

app.listen(8080, () => {
    console.log("Servidor escuchando");
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)