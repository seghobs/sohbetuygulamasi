import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginScreen = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name: name.trim(),
        avatar: avatar || `https://ui-avatars.com/api/?name=${name.trim()}&background=random&color=fff&size=128`,
        status: 'online'
      };
      
      onLogin(userData);
      toast.success(`Welcome, ${name.trim()}!`);
      setIsLoading(false);
    }, 1000);
  };

  const generateRandomAvatar = () => {
    const colors = ['ff6b6b', '4ecdc4', '45b7d1', '96ceb4', 'feca57', 'ff9ff3', '54a0ff', '5f27cd'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomName = Math.random().toString(36).substring(7);
    setAvatar(`https://ui-avatars.com/api/?name=${randomName}&background=${randomColor}&color=fff&size=128`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-4"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ChatApp</h1>
          <p className="text-gray-600">Connect with friends in real-time</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={avatar || `https://ui-avatars.com/api/?name=User&background=primary&color=fff&size=128`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-primary-100 shadow-lg"
                />
                <button
                  type="button"
                  onClick={generateRandomAvatar}
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 focus-ring"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Joining...
                </div>
              ) : (
                'Join Chat'
              )}
            </button>
          </form>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
              <div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-4 h-4 text-primary-600" />
                </div>
                <p>Real-time Chat</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <p>User Status</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Camera className="w-4 h-4 text-primary-600" />
                </div>
                <p>Custom Avatars</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;