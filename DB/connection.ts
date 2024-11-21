import mongoose from 'mongoose';

// MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/PaymentDB";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURL, {
    });

    console.log('Successfully connected to MongoDB database: PaymentDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB connection established.');
});

db.on('error', (error) => {
  console.error('Error occurred in MongoDB connection:', error);
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected.');
});

db.on('reconnected', () => {
  console.log('MongoDB connection reconnected.');
});


export default connectToDatabase;
