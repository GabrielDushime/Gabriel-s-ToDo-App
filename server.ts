import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose'; 
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import authRoutes from './src/routes/authRoutes';
import todoRoutes from './src/routes/todoRoutes';

dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 3000; 
const MONGODB_URI = 'mongodb://127.0.0.1:27017/todoApp';

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
// Routes
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
