const express = require('express');
const SocketIO = require('socket.io');


const app = express();

var server_port = 5004;
const server = app.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})

var io = SocketIO(server, {
    cors: {
      origin: "*"
    }
});


const maxClientsPerRoom = 5;
const roomCounts = {};

io.on('connection', (socket) => {
    socket.on("join", (roomId) => {
        if (roomCounts[roomId] === undefined) {
            roomCounts[roomId] = 1;
        } 
        else if (roomCounts[roomId] < maxClientsPerRoom) {
            roomCounts[roomId]++;
        } 
        else {
            socket.emit('room-full', roomId);
            console.log("room full" + roomCounts[roomId]);
            return;
        }
        socket.join(roomId);
        console.log("User joined in a room : " + roomId + " count:" + roomCounts[roomId]);
        socket.on('disconnect', () => {
            roomCounts[roomId]--;
            console.log("disconnect, count:" + roomCounts[roomId]);
        });
    })

    socket.on("rtc-message", (data) => {
        var room = JSON.parse(data).roomId;
        socket.broadcast.to(room).emit('rtc-message', data);
    })
});