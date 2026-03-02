const io = require('socket.io')(3000, {
  cors: { origin: "*" } // 보안 설정 (어디서든 접속 가능하게)
});

let players = {}; // 접속한 플레이어들의 좌표 저장소

io.on('connection', (socket) => {
  console.log('새로운 플레이어 접속:', socket.id);

  // 1. 새로운 플레이어가 들어오면 초기 위치 설정
  players[socket.id] = { x: 100, y: 100 };

  // 2. 모든 사람에게 현재 플레이어들 상태 전송
  io.emit('updatePlayers', players);

  // 3. 누군가 움직였을 때 데이터 받기
  socket.on('move', (data) => {
    if (players[socket.id]) {
      players[socket.id].x += data.x;
      players[socket.id].y += data.y;
      // 4. 변화된 위치를 다시 모두에게 알림
      io.emit('updatePlayers', players);
    }
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('updatePlayers', players);
  });
});

console.log("서버가 3000번 포트에서 실행 중입니다...");