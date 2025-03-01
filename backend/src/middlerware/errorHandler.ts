import { Request, Response, NextFunction } from 'express';

/**
 * Generic error handler middleware for Express.
 * Captures errors thrown in the application, logs them,
 * and sends a JSON response with the error message and proper HTTP status code.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  // If headers have already been sent, delegate to the default Express error handler.
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;

  // ENHANCEMENT: Add more specific error handling based on the error message.
  switch (err.message) {
    case 'File not found':
      statusCode = 404;
      break;

    case 'Invalid filename value':
      statusCode = 400;
      break;

    default:
      break;
  }

  console.error('Error:', err);

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};