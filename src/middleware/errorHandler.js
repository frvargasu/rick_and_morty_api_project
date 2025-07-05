const winston = require('winston');

// Create logger instance for errors
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'rick-and-morty-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(err.message, {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.message.includes('not found')) {
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.message.includes('timeout')) {
    statusCode = 408;
    message = 'Request timeout';
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { 
      details: err.message,
      stack: err.stack 
    })
  });
};

module.exports = errorHandler;