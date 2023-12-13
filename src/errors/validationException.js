module.exports = function validationException(error) {
  this.status = 400;
  this.message = error.details.map((detail) => detail.message);
};
