import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/chat/Chat';

const ChatPage = () => {
  const { freelancerId } = useParams();
  // In a real app, userId would come from your authentication system
  const userId = '1'; // Temporary hardcoded user ID

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-gray-400">
            Chat with your freelancer
          </p>
        </div>
        
        <Chat userId={userId} freelancerId={freelancerId} />
      </div>
    </div>
  );
};

export default ChatPage; 