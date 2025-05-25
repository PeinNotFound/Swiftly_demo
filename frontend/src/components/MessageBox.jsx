import React, { useState } from 'react';
import { FiSend, FiX } from 'react-icons/fi';

const MessageBox = ({ isOpen, onClose, recipient }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement message sending logic
    console.log('Sending message:', message);
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl w-full max-w-lg border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Send Message</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Recipient Info */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {recipient?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-white">{recipient?.name || 'User'}</h3>
              <p className="text-sm text-gray-400">{recipient?.role || 'User'}</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-yellow-400 text-black rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <FiSend className="mr-2" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageBox; 