const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'MongoServerError' && error.code === 11000) {
    console.log(error.message);
    return response.status(400).json({ error: 'event already exists' });
  }
  if (error.name === 'ValidationError') {
    console.log(error.message);
    return response.status(400).json({ error: error.message });
  }

  next(error);

  response.status(500).send({ error: 'Something went wrong' });
};
module.exports = errorHandler;
