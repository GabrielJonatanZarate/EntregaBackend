// const socket = io();

// // Función para agregar un producto a la lista
// const addProductToList = (product) => {
//     const productList = document.getElementById('productList');
//     const productItem = document.createElement('li');
//     productItem.textContent = `${product.title}: ${product.description} - Precio: ${product.price} - Stock: ${product.stock}`;
//     productList.appendChild(productItem);
// };

// // Escuchar por productos nuevos
// socket.on('loadProducts', (products) => {
//     const productList = document.getElementById('productList');
//     productList.innerHTML = ''; // Limpiar la lista existente
//     products.forEach(addProductToList); // Agregar cada producto a la lista
// });

// // Emitir el evento para agregar un nuevo producto
// document.getElementById('addProductButton').addEventListener('click', () => {
//     const title = document.getElementById('titleInput').value;
//     const description = document.getElementById('descriptionInput').value;
//     const price = document.getElementById('priceInput').value;
//     const stock = document.getElementById('stockInput').value;

//     const newProduct = { title, description, price, stock };
//     socket.emit('addProduct', newProduct); // Enviar el nuevo producto al servidor

//     // Limpiar los campos de entrada
//     document.getElementById('titleInput').value = '';
//     document.getElementById('descriptionInput').value = '';
//     document.getElementById('priceInput').value = '';
//     document.getElementById('stockInput').value = '';
// });

const socket = io();

// Función para agregar un producto a la lista
const addProductToList = (product) => {
    const productList = document.getElementById('productList');
    const productItem = document.createElement('li');
    productItem.textContent = `${product.title}: ${product.description} - Precio: ${product.price} - Stock: ${product.stock}`;
    
    // Crear un botón para eliminar el producto
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = () => {
        socket.emit('deleteProduct', product.id); // Emitir evento de eliminación
    };
    
    productItem.appendChild(deleteButton);
    productList.appendChild(productItem);
};

// Escuchar por la carga de productos
socket.on('loadProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista existente
    products.forEach(addProductToList); // Agregar cada producto a la lista
});

// Emitir el evento para agregar un nuevo producto
document.getElementById('addProductButton').addEventListener('click', () => {
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const price = document.getElementById('priceInput').value;
    const stock = document.getElementById('stockInput').value;

    const newProduct = { title, description, price, stock };
    socket.emit('addProduct', newProduct); // Enviar el nuevo producto al servidor

    // Limpiar los campos de entrada
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('priceInput').value = '';
    document.getElementById('stockInput').value = '';
});