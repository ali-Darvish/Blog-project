function CreateUserDto({
  firstname,
  lastname,
  username,
  password,
  gender = "not-set",
  phoneNumber,
  role = "blogger",
}) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.password = password;
  this.gender = gender;
  this.phoneNumber = phoneNumber;
  this.role = role;
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

function UserLoginDto({ username, password }) {
  this.username = username;
  this.password = password;
}

module.exports = { CreateUserDto, ReadUserDto, UserLoginDto };
