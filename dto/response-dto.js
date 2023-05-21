function ResponseDto(status, message, data = null) {
  this.status = status;
  this.message = message;

  if (!!data) {
    this.data = data;
  }
}

module.exports = { ResponseDto };
