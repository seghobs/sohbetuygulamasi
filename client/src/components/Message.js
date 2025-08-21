import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Message = ({ message, isOwn, senderName, timestamp }) => {
  const formatTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'HH:mm');
    } catch (error) {
      return '00:00';
    }
  };

  const getMessageStyle = () => {
    if (isOwn) {
      return {
        container: 'flex justify-end',
        bubble: 'bg-primary-600 text-white',
        name: 'text-right'
      };
    } else {
      return {
        container: 'flex justify-start',
        bubble: 'bg-white text-gray-800 border border-gray-200',
        name: 'text-left'
      };
    }
  };

  const styles = getMessageStyle();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`${styles.container} mb-4 group`}
    >
      <div className="max-w-xs lg:max-w-md">
        {/* Sender Name (for group chats) */}
        {!isOwn && (
          <div className={`mb-1 ${styles.name}`}>
            <span className="text-xs font-medium text-gray-600">
              {senderName}
            </span>
          </div>
        )}

        {/* Message Bubble */}
        <div className={`${styles.bubble} rounded-2xl px-4 py-2 shadow-sm relative`}>
          <div className="text-sm leading-relaxed break-words">
            {message.content}
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 opacity-70 ${
            isOwn ? 'text-primary-100' : 'text-gray-500'
          }`}>
            {formatTime(timestamp)}
          </div>

          {/* Message Status (for own messages) */}
          {isOwn && (
            <div className="absolute -bottom-5 right-0 text-xs text-gray-400">
              ✓✓
            </div>
          )}
        </div>

        {/* Message Actions (hover) */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          isOwn ? 'text-right' : 'text-left'
        } mt-1`}>
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <button className="hover:text-gray-700 transition-colors">
              Reply
            </button>
            <button className="hover:text-gray-700 transition-colors">
              Forward
            </button>
            {isOwn && (
              <button className="hover:text-gray-700 transition-colors">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;