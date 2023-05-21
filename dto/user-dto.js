function CreateUserDto({
  firstname,
  lastname,
  username,
  password,
  gender = "not-set",
  phoneNumber,
}) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.password = password;
  this.gender = gender;
  this.phoneNumber = phoneNumber;
}

function ReadUserDto({
  _id,
  firstname,
  lastname,
  username,
  gender = "not-set",
  phoneNumber,
  role = "blogger",
}) {
  this.userId = _id;
  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.gender = gender;
  this.phoneNumber = phoneNumber;
  this.role = role;
}

module.exports = { CreateUserDto, ReadUserDto };
