const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  const mongod = new MongoMemoryServer();
  const mongoUri = await mongod.getUri();

  process.env.MONGODB_URI = mongoUri;

  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
};
