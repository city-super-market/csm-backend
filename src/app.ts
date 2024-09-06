import express from 'express';
import dotenv from 'dotenv';
import router from './routes/v1';
import globalErrorHandler from './middlewares/errorHandler.middleware';
import ApiException from './utils/exceptions/ApiException';
import * as statusCodes from './utils/constants/statusCodes';

// Config
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// V1 Routes
app.use('/api/v1', router);

// Serve frontend
app.use(express.static('public/client'));
app.get('*', (req, res) => res.sendFile('public/client/index.html', { root: __dirname }));

// Error Handler
app.all('*', (req, res, next) => next(new ApiException(statusCodes.NOT_FOUND, "Oops! Looks like you're lost.")));
app.use(globalErrorHandler);

export default app;
