const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (msg) => {
        io.sockets.emit('message', msg); 
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
