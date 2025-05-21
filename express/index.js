const express = require('express');
const cors = require('cors');
const { connectDB, Message } = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/messages/:userId/:freelancerId', async (req, res) => {
  try {
    const { userId, freelancerId } = req.params;
    const messages = await Message.find({
      $or: [
        { userId, freelancerId },
        { userId: freelancerId, freelancerId: userId }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  const { userId, freelancerId, content } = req.body;
  if (!userId || !freelancerId || !content) {
    return res.status(400).json({ message: 'User ID, Freelancer ID, and content are required' });
  }
  const message = new Message({ userId, freelancerId, content });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 