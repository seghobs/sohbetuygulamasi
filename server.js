const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// In-memory storage for demo purposes
let users = [];
let messages = [];
let onlineUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // User joins
  socket.on('user_join', (userData) => {
    const user = {
      id: socket.id,
      name: userData.name,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
      status: 'online'
    };
    
    users.push(user);
    onlineUsers.set(socket.id, user);
    
    io.emit('user_list_update', users);
    io.emit('user_joined', user);
    
    console.log(`${user.name} joined the chat`);
  });

  // Send message
  socket.on('send_message', (messageData) => {
    const message = {
      id: Date.now().toString(),
      senderId: socket.id,
      senderName: onlineUsers.get(socket.id)?.name || 'Unknown',
      content: messageData.content,
      timestamp: new Date().toISOString(),
      type: messageData.type || 'text'
    };
    
    messages.push(message);
    io.emit('new_message', message);
    
    console.log(`Message from ${message.senderName}: ${message.content}`);
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('user_typing', {
        userId: socket.id,
        userName: user.name,
        isTyping
      });
    }
  });

  // User disconnect
  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      user.status = 'offline';
      onlineUsers.delete(socket.id);
      
      const userIndex = users.findIndex(u => u.id === socket.id);
      if (userIndex !== -1) {
        users[userIndex].status = 'offline';
      }
      
      io.emit('user_list_update', users);
      io.emit('user_left', user);
      
      console.log(`${user.name} left the chat`);
    }
  });
});

// API Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/online-users', (req, res) => {
  res.json(Array.from(onlineUsers.values()));
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});