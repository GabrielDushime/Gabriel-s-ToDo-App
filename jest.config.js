const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  const mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();

  process.env.MONGODB_URI = mongoUri;

  return {
    rootDir: './',
    preset: 'ts-jest',
    testEnvironment: 'node',
  };

// Define global setup function
module.exports.globalSetup = async () => {
  console.log('Jest global setup: Before all tests');
};

// Define global teardown function
module.exports.globalTeardown = async () => {
  console.log('Jest global teardown: After all tests');
}
}
