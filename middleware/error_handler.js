module.exports = (err, req, res, next) => {
  if (!err.httpStatusCode) err.httpStatusCode = 500;
  /* enable this in production only
  res.status(err.httpStatusCode).send({
    succss: false,
    message: err.httpStatusCode == 500 ? "Internal Server Error" : err.message,
  });
  */
  console.log(err, "ERRRORRR");
  res.status(err.httpStatusCode).send({
    //this for development only
    success: false,
    message: String(err),
  });
};
