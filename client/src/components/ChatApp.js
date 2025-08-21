import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, MoreVertical, Search, Send, Smile, Paperclip, Phone, Video } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';

const ChatApp = ({ user, onLogout }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (socket) {
      // Join chat
      socket.emit('user_join', {
        name: user.name,
        avatar: user.avatar
      });

      // Listen for user list updates
      socket.on('user_list_update', (updatedUsers) => {
        setUsers(updatedUsers.filter(u => u.id !== user.id));
      });

      // Listen for new messages
      socket.on('new_message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      // Listen for typing indicators
      socket.on('user_typing', (typingData) => {
        if (typingData.isTyping) {
          setTypingUsers(prev => new Set(prev).add(typingData.userName));
        } else {
          setTypingUsers(prev => {
            const newSet = new Set(prev);
            newSet.delete(typingData.userName);
            return newSet;
          });
        }
      });

      // Listen for user join/leave events
      socket.on('user_joined', (newUser) => {
        if (newUser.id !== user.id) {
          toast.success(`${newUser.name} joined the chat`);
        }
      });

      socket.on('user_left', (leftUser) => {
        if (leftUser.id !== user.id) {
          toast(`${leftUser.name} left the chat`, { icon: '👋' });
        }
      });

      return () => {
        socket.off('user_list_update');
        socket.off('new_message');
        socket.off('user_typing');
        socket.off('user_joined');
        socket.off('user_left');
      };
    }
  }, [socket, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content) => {
    if (socket && content.trim()) {
      socket.emit('send_message', { content: content.trim() });
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      socket.emit('typing', isTyping);
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    onLogout();
  };

  return (
    <div className="h-screen bg-chat-bg flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 bg-white border-r border-gray-200 flex flex-col"
          >
            <Sidebar
              user={user}
              users={users}
              onUserSelect={setSelectedChat}
              onLogout={handleLogout}
              selectedChat={selectedChat}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatArea
            selectedChat={selectedChat}
            currentUser={user}
            messages={messages}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            typingUsers={typingUsers}
            onBack={() => setSelectedChat(null)}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Select a chat</h2>
              <p className="text-gray-500">Choose a user from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg border border-gray-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default ChatApp;