const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const express = require('express');


const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
    path: '/socket.io',
    allowEIO3: true,
    transports: ['websocket', 'polling'],
  });

  global.io = io;
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });
    
  });
  

  app.all('*', (req, res) => handle(req, res));

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });

});

