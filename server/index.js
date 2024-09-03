const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('join_room', (roomCode) => {
        socket.join(roomCode);
    });

    socket.on('send_message', ({ message, roomCode }) => {
        io.to(roomCode).emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
