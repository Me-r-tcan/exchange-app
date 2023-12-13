module.exports = function badRequestException(message) {
  this.status = 400;
  this.message = message;
};
