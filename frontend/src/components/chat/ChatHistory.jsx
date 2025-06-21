import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import messageService from '../../services/messageService';

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchChats = useCallback(async () => {
    try {
      console.log('=== ChatHistory Debug ===');
      console.log('1. Current user:', user);
      
      if (!user || !user.id) {
        console.log('2. No user found in localStorage');
        setError('Please log in to view your chats');
        setLoading(false);
        return;
      }

      const userIdStr = user.id.toString();
      console.log('3. Fetching chats for userId:', userIdStr);
      
      const response = await messageService.getChatPartners(userIdStr);
      console.log('4. Chat partners response:', response);
      
      if (!Array.isArray(response)) {
        console.error('5. Invalid response format:', response);
        setError('Invalid response from server');
        setLoading(false);
        return;
      }

      console.log('6. Setting chats state with:', response);
      setChats(response);
      setLoading(false);
    } catch (err) {
      console.error('7. Error fetching chats:', err);
      setError(err.message || 'Failed to load chats');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log('8. ChatHistory mounted, user:', user);
    fetchChats();
    
    // Set up polling
    const interval = setInterval(fetchChats, 5000);
    return () => clearInterval(interval);
  }, [fetchChats]);

  const handleChatClick = (partnerId) => {
    console.log('9. Chat clicked with partnerId:', partnerId);
    navigate(`/chat/${partnerId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading chats...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!chats || chats.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">You have no active conversations</p>
        <p className="text-sm text-gray-400 mt-2">Start a new chat by visiting a freelancer's profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        console.log('10. Rendering chat:', chat);
        return (
          <div
            key={chat._id}
            onClick={() => handleChatClick(chat.freelancerId)}
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
              {chat.partnerName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 truncate">
                  {chat.partnerName}
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date(chat.lastMessageTime).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {chat.isCurrentUserSender ? 'You: ' : ''}{chat.lastMessage}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatHistory; 