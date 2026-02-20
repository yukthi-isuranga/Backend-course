import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in the environment');
}

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
});

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

const disconnectFromDatabase = async () => {
  await prisma.$disconnect();
  console.log('Disconnected from the database successfully!');
};

export { connectToDatabase, disconnectFromDatabase };
