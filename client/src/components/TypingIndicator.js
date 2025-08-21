import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = ({ userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start mb-4"
    >
      <div className="max-w-xs">
        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {userName || 'Someone'} is typing
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;