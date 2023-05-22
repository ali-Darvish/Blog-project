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

function UpdateUserDto({
  firstname = null,
  lastname = null,
  username = null,
  gender = "not-set",
}) {
  if (!!firstname) this.firstname = firstname;
  if (!!lastname) this.lastname = lastname;
  if (!!username) this.username = username;
  if (!!gender) this.gender = gender;
}
function UpdateUserPasswordDto({ currentPassword, newPassword }) {
  this.currentPassword = currentPassword;
  this.newPassword = newPassword;
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

module.exports = { CreateUserDto, ReadUserDto, UpdateUserDto,UpdateUserPasswordDto };
