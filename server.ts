// server.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const {NextApiResponse , NextApiRequest} = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
    path: '/socket.io',
  });

  io.attach(server);

  app.get('/hello', async (req = NextApiRequest, res = NextApiResponse) => {
    res.send('Hello World')
  });

    io.on('connection', (socket) => {
        console.log('connection');
        socket.emit('status', 'Hello from Socket.io');

        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    });

    app.all('*', (req = NextApiRequest, res = NextApiResponse) => handle(req, res));
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});