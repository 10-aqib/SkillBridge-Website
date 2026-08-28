const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    // First, try standard connection if URI exists
    if (mongoUri) {
      try {
        console.log('Attempting standard MongoDB connection...');
        const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (err) {
        console.warn(`Standard MongoDB connection failed: ${err.message}. Falling back to Memory Server...`);
      }
    } else {
      console.warn('MongoDB URI is not defined. Falling back to Memory Server...');
    }

    // Fallback to mongodb-memory-server
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    
    const conn = await mongoose.connect(memoryUri);
    console.log(`MongoDB In-Memory Server Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
