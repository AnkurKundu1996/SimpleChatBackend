const express = require('express');
const http = require('http');
require('dotenv').config();
const cors = require('cors');
const { Server } = require('socket.io');
const routes = require('./router/routes');

const app = express();

const port = process.env.PORT || 7001;

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var option = {
    origin: process.env.FRONT_END_URL,
    optionsSuccessStatus: 200
}
app.use(cors(option));

const server = http.createServer(app);

app.use('/api', routes);

server.listen(port, () => {
    console.log(`Server started at:http://localhost:${port}`);
});

const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join room", (data => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    }));

    socket.on("send message", (data) => {
        socket.to(data.room).emit("receive message", data);
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    })
});