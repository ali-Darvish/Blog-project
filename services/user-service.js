const User = require("../models/User");
const { CreateUserDto } = require("../utils/user-dto");

const adminGenerator = async () => {
  const existAdmin = await User.findOne({ username: "admin" });
  if (!!existAdmin) return;
  const admin = new User(
    new CreateUserDto({
      firstname: process.env.ADMIN_FIRSTNAME,
      lastname: process.env.ADMIN_LASTNAME,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      phoneNumber: process.env.ADMIN_PHONENUMBER,
      role: process.env.ADMIN_ROLE,
    })
  );
  await admin.save();
};

const findUserById = (userId) => {
  return User.findById(userId);
};

module.exports = { adminGenerator, findUserById };
