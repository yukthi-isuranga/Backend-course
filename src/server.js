import express from 'express';
import { config } from 'dotenv';
import { connectToDatabase, disconnectFromDatabase } from './config/db.js';

// Importing movie routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchListRoutes from './routes/watchListRoutes.js';

config(); // Load environment variables from .env file
connectToDatabase(); // Connect to the database

const app = express();

const PORT = 5001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//API routes
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', watchListRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!xxxx...222xxxx' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  await disconnectFromDatabase(); // Disconnect from the database
  process.exit(0); // Exit the process with a success code
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error);
  await disconnectFromDatabase(); // Disconnect from the database
  process.exit(1); // Exit the process with an error code
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  await disconnectFromDatabase(); // Disconnect from the database
  process.exit(1); // Exit the process with an error code
});

// Handle process exit
process.on('exit', async (code) => {
  console.log(`Process exiting with code: ${code}`);
  await disconnectFromDatabase(); // Disconnect from the database
});
