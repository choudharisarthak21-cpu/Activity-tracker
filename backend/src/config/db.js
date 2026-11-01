const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/activity_tracker';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB] Primary connection failed (${error.message}). Initializing embedded database fallback...`);

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const fallbackUri = mongod.getUri();

      const conn = await mongoose.connect(fallbackUri);
      console.log(`[MongoDB] Fallback in-memory MongoDB initialized at: ${fallbackUri}`);
      console.log(`[MongoDB] Full Mongoose schemas, queries, and persistence are active for this session.`);
      return conn;
    } catch (fallbackError) {
      console.error(`[MongoDB] Failed to initialize database: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
