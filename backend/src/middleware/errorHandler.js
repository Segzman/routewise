// Global error handler middleware
// Owner: Sekun

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  let status = 500;
  if (err.message.includes('not found')) status = 404;
  else if (err.message.includes('required') || err.message.includes('Invalid') || err.message.includes('must be')) status = 400;

  res.status(status).json({
    success: false,
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
