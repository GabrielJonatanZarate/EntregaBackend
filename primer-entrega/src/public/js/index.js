const socket = io();
socket.emit('message', 'Me comunico desde un websocket');

socket.on('Evento_para_socket_individual', data =>{
    console.log(data);
});

socket.on('Evento_para_todos_menos_para_socket_actual', data => {
    console.log(data);
});

socket.on('Evento_para_todos', data => {
    console.log(data);
});

const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messageContainer = document.getElementById('messageContainer');

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.ariaValueMax;
    socket.emit('newMessage', message);
    messageInput.value = '';
});

socket.on('loadMessage', (message) => {
    message.forEach ((message) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${message.socketid}: ${message.message}`;
        messageContainer.appendChild(messageElement);
    })
})