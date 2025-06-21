import React, { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import messageService from '../../services/messageService';

const Chat = ({ userId, freelancerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Convert IDs to strings for consistent comparison
  const userIdStr = userId?.toString();
  const freelancerIdStr = freelancerId?.toString();

  // Fetch messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userIdStr || !freelancerIdStr) {
        console.log('Missing user IDs:', { userIdStr, freelancerIdStr });
        return;
      }

      try {
        console.log('Fetching messages for:', { userIdStr, freelancerIdStr });
        const data = await messageService.getMessages(userIdStr, freelancerIdStr);
        console.log('Received messages:', data);
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setError('Failed to fetch messages');
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, [userIdStr, freelancerIdStr]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userIdStr || !freelancerIdStr) return;

    setIsLoading(true);
    try {
      console.log('Sending message:', {
        userId: userIdStr,
        freelancerId: freelancerIdStr,
        content: newMessage
      });

      const sentMessage = await messageService.sendMessage(userIdStr, freelancerIdStr, newMessage);
      console.log('Message sent successfully:', sentMessage);

      // Update messages immediately with the new message
      setMessages(prev => {
        const newMessages = [...prev, sentMessage];
        console.log('Updated messages:', newMessages);
        return newMessages;
      });
      
      setNewMessage('');
      setError(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // Debug log for messages
  useEffect(() => {
    console.log('Current messages state:', messages);
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Chat with User {freelancerIdStr}</h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500">
          {error}
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.userId.toString() === userIdStr;
            console.log('Message ownership check:', {
              messageUserId: message.userId.toString(),
              currentUserId: userIdStr,
              isOwnMessage
            });

            return (
              <div
                key={message._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwnMessage
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 