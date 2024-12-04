const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 방 정보
const rooms = new Map();

// 새 클라이언트 확인됨 -> 비디오 송출이 안되는 문제 
io.on('connection', (socket) => {
  console.log('새 클라이언트 연결:', socket.id);

  
  socket.on('join-room', async (roomId) => {
    try {
      const room = io.sockets.adapter.rooms.get(roomId);
      const numClients = room ? room.size : 0;

      if (numClients === 0) {
        socket.join(roomId);
        console.log(`방 ${roomId} 생성됨`);
        rooms.set(roomId, new Set([socket.id]));
      } else {
        socket.join(roomId);
        rooms.get(roomId).add(socket.id);
        
        socket.to(roomId).emit('user-joined', { userId: socket.id });
   
        const participants = Array.from(rooms.get(roomId)).filter(id => id !== socket.id);
        socket.emit('room-users', { users: participants });
      }

      console.log(`사용자 ${socket.id}가 방 ${roomId}에 참가함`);
    } catch (error) {
      console.error('방 참가 중 오류:', error);
      socket.emit('error', { message: '방 참가 실패' });
    }
  });

  socket.on('offer', (data) => {
    console.log('Offer 전달:', { from: socket.id, to: data.to });
    socket.to(data.to).emit('offer', {
      offer: data.offer,
      from: socket.id
    });
  });

  socket.on('answer', (data) => {
    console.log('Answer 전달:', { from: socket.id, to: data.to });
    socket.to(data.to).emit('answer', {
      answer: data.answer,
      from: socket.id
    });
  });

  socket.on('ice-candidate', (data) => {
    socket.to(data.to).emit('ice-candidate', {
      candidate: data.candidate,
      from: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('클라이언트 연결 종료:', socket.id);
    
  
    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);
        socket.to(roomId).emit('user-left', { userId: socket.id });

        if (participants.size === 0) {
          rooms.delete(roomId);
          console.log(`방 ${roomId} 삭제됨`);
        }
      }
    });
  });
});


httpServer.listen(3001, () => {
  console.log('서버가 포트 3001에서 시작되었습니다.');
});