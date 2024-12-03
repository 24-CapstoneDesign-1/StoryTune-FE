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

// 방 정보를 저장할 Map
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('새 클라이언트 연결:', socket.id);

  // 방 참가 처리
  socket.on('join-room', async (roomId) => {
    try {
      // 현재 방 참가자 수 확인
      const room = io.sockets.adapter.rooms.get(roomId);
      const numClients = room ? room.size : 0;

      // 방이 없거나 처음 들어가는 경우 새로 생성
      if (numClients === 0) {
        socket.join(roomId);
        console.log(`방 ${roomId} 생성됨`);
        rooms.set(roomId, new Set([socket.id]));
      } else {
        // 기존 방에 참가
        socket.join(roomId);
        rooms.get(roomId).add(socket.id);
        
        // 방의 다른 참가자들에게 새 참가자 알림
        socket.to(roomId).emit('user-joined', { userId: socket.id });
        
        // 새 참가자에게 현재 방 참가자 목록 전송
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
    
    // 모든 방에서 사용자 제거
    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);
        socket.to(roomId).emit('user-left', { userId: socket.id });
        
        // 방이 비었으면 삭제
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