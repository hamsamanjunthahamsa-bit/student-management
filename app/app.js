const express = require('express');
const cors = require('cors');
const studentRoutes = require('../routers/student.routers');
const authRoutes = require('../routers/auth.routers');

const logger = require('../middlewares/logger.middleware');
const errorHandler = require('../middlewares/error.middleware');
const notFound = require('../middlewares/notfound.middleware');

const app = express();

// Enable CORS for the frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;