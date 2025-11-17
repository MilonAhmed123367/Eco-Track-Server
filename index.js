require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routers
const challengesRouter = require('./routes/Challenge');
const tipsRouter = require('./routes/Tip');
const eventsRouter = require('./routes/Event');
const userChallengesRouter = require('./routes/userChallenges');

// Public routes
app.use('/api/challenges', challengesRouter);
app.use('/api/tips', tipsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/userChallenges', userChallengesRouter);

// Root
app.get('/', (req, res) => {
  res.send({ ok: true, message: 'EcoTrack API running successfully 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});
