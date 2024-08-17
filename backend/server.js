const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const modelRoutes = require('./routes/modelRoutes');
const boardPartRoutes = require('./routes/boardPartRoutes');
const componentRoutes = require('./routes/componentRoutes');
const boardPartComponentRoutes = require('./routes/boardPartComponentRoutes');

dotenv.config();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';
// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/board-parts', boardPartRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/board-part-components', boardPartComponentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
