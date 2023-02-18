const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.statusText || "Error Occured");
};

export default errorHandlerMiddleware;
