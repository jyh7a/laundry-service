## 참고링크들

- https://poiemaweb.com/nodejs-socketio

// 접속된 모든 클라이언트에게 메시지를 전송한다
io.emit('event_name', msg);

// 메시지를 전송한 클라이언트에게만 메시지를 전송한다
socket.emit('event_name', msg);

// 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
socket.broadcast.emit('event_name', msg);

// 특정 클라이언트에게만 메시지를 전송한다
io.to(id).emit('event_name', data);
