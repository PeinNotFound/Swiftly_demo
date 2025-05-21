import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Chat = () => {
  const { freelancerId } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Here you would send the message to the backend
    setInput('');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 w-full max-w-lg flex flex-col" style={{ minHeight: 400 }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Chat with Freelancer #{freelancerId}</h2>
          <button
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => navigate(-1)}
          >
            Close
          </button>
        </div>
        <div className="flex-1 text-gray-400 mb-4">Chat UI will go here.</div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 