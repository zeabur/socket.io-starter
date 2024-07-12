import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';

const server = http.createServer((req, res) => {
	fs.readFile('index.html', (err, data) => {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
});

const io = new Server(server);

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	console.log(`Server running on http://127.0.0.1:${PORT}`);
});