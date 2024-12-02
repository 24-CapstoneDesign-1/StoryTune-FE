const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('./certs/private.pem', 'utf8');
const certificate = fs.readFileSync('./certs/cert.pem', 'utf8');  
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials);

const wss = new WebSocket.Server({ port: 3000 });

const PORT = 443; 
let clients = {};

wss.on('connection', (socket) => {
  console.log('클라이언트가 연결되었습니다.');

  socket.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'register':
        clients[data.id] = socket; 
        console.log(`클라이언트 등록: ${data.id}`);
        break;

      case 'offer':
      case 'answer':
      case 'ice-candidate':
        if (clients[data.receiverId]) {
          clients[data.receiverId].send(JSON.stringify(data)); 
        }
        break;

      default:
        console.log('알 수 없는 메시지 타입:', data.type);
    }
  });

  socket.on('close', () => {
    for (let id in clients) {
      if (clients[id] === socket) {
        delete clients[id];
        console.log(`클라이언트 연결 해제: ${id}`);
        break;
      }
    }
  });
});


httpsServer.listen(PORT, () => {
  console.log(`HTTP 서버가 https://localhost:${PORT} 에서 실행 중입니다.`);
});
