const app = require('./app/app');
const { PORT } = require('./config');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
