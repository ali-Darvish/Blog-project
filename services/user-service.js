const User = require("../database/models/user-model");
const { CreateUserDto } = require("../dto/user-dto");

const createNewUser = (newUserInfo) => {
  const newUser = new User(newUserInfo);
  return newUser.save();
};

const findUserById = (userId) => {
  return User.findById(userId);
};

const findUserByUsername = (username) => {
  return User.findOne({ username });
};

const findUserByPhoneNumber = (phoneNumber) => {
  return User.findOne({ phoneNumber });
};

const adminGenerator = async () => {
  const existAdmin = await findUserByUsername("admin");
  if (!!existAdmin) return;
  const adminInfo = new CreateUserDto({
    firstname: process.env.ADMIN_FIRSTNAME,
    lastname: process.env.ADMIN_LASTNAME,
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    phoneNumber: process.env.ADMIN_PHONENUMBER,
    role: process.env.ADMIN_ROLE,
  });
  await createNewUser(adminInfo);
};

module.exports = {
  adminGenerator,
  createNewUser,
  findUserById,
  findUserByUsername,
  findUserByPhoneNumber,
};
