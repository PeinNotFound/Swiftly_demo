import React from 'react';
import ChatHistory from '../components/chat/ChatHistory';

const ChatsPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-200">Your Chats</h1>
          <p className="mt-2 text-gray-400">View and manage your conversations</p>
        </div>
        <ChatHistory />
      </div>
    </div>
  );
};

export default ChatsPage; 