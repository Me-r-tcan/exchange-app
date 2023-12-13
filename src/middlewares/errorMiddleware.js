module.exports = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status || 500).send({
    path: req.originalUrl,
    timestamp: new Date().getTime(),
    message: status !== 500 ? message : 'Internal Server Error',
  });
};
