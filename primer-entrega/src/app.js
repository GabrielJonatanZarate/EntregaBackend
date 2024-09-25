import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const PORT = 8080;

// Crear el servidor HTTP a partir de la app de Express
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Crear el servidor de sockets que vive dentro del servidor HTTP
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar enrutador para las vistas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Inicializar el motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Establecer la carpeta pública de manera estática
app.use(express.static(__dirname + '/public'));

const messages =[];
// Escuchar conexiones entrantes
socketServer.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on('message', data => {
        console.log(data);  
    });

    socket.emit('Evento_para_socket_individual');

    socket.broadcast.emit('Evento_para_todos_menos_para_socket_actual');

    socketServer.emit('Evento_para_todos');

    socket.emit('loadMessages', messages);

    socket.on('newMessage', (message) => {
        const newMessage = {socketid: socket.id, message};
        messages.push(newMessage);
        socket.emit('newMessage', newMessage);
    });
});