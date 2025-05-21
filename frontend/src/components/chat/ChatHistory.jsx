import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('http://localhost:5000/api/messages/1/1');
        const data = await response.json();
        setChats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-gray-200">Recent Chats</h2>
      </div>
      <div className="divide-y divide-gray-800">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Link
              key={chat._id}
              to={`/chat/${chat.freelancerId}`}
              className="block p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={`https://via.placeholder.com/40?text=${chat.freelancerId}`}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">
                    Freelancer {chat.freelancerId}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {chat.content}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-xs text-gray-500">
                    {new Date(chat.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">
            No recent chats
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory; 