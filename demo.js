const io = require('socket.io-client');

// Test the chat application
console.log('🚀 Starting ChatApp Demo...\n');

// Connect to the server
const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('✅ Connected to server');
  
  // Simulate user joining
  socket.emit('user_join', {
    name: 'Demo User',
    avatar: 'https://ui-avatars.com/api/?name=Demo&background=random&color=fff&size=128'
  });
  
  console.log('👤 Demo user joined the chat');
});

socket.on('user_list_update', (users) => {
  console.log('📋 User list updated:', users.length, 'users online');
});

socket.on('user_joined', (user) => {
  console.log('🎉', user.name, 'joined the chat');
});

socket.on('user_left', (user) => {
  console.log('👋', user.name, 'left the chat');
});

socket.on('new_message', (message) => {
  console.log('💬 New message from', message.senderName + ':', message.content);
});

socket.on('user_typing', (typingData) => {
  if (typingData.isTyping) {
    console.log('⌨️', typingData.userName, 'is typing...');
  }
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

// Simulate sending a message after 2 seconds
setTimeout(() => {
  if (socket.connected) {
    socket.emit('send_message', { content: 'Hello from demo script! 👋' });
    console.log('📤 Sent demo message');
  }
}, 2000);

// Simulate typing indicator
setTimeout(() => {
  if (socket.connected) {
    socket.emit('typing', true);
    console.log('⌨️ Started typing...');
    
    setTimeout(() => {
      socket.emit('typing', false);
      console.log('⌨️ Stopped typing');
    }, 3000);
  }
}, 4000);

// Disconnect after 10 seconds
setTimeout(() => {
  console.log('\n🔚 Demo completed, disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 10000);

console.log('📱 Open http://localhost:3000 in your browser to see the chat app');
console.log('⏳ Demo will run for 10 seconds...\n');