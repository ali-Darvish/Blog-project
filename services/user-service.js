const Jimp = require("jimp");
const { unlink } = require("node:fs/promises");

const User = require("../database/models/user-model");
const { CreateUserDto } = require("../dto/user-dto");
const { join } = require("node:path");

const createNewUser = (newUserInfo) => {
  const newUser = new User(newUserInfo);
  return newUser.save();
};

const findAllUsers = () => {
  return User.find({ username: { $ne: "admin" } });
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

const deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
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

const normalizeAvatar = async (file) => {
  const { filename, path } = file;
  const avatar = await Jimp.read(path);
  avatar
    .cover(256, 256, Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(60)
    .write(
      join(
        __dirname,
        "..",
        "public",
        "images",
        "avatars",
        `${filename.replace(/(\..+)$/, ".png")}`
      )
    );
  const newPath = filename.replace(/(\..+)$/, ".png");
  await unlink(path);
  return newPath;
};

module.exports = {
  adminGenerator,
  createNewUser,
  findAllUsers,
  findUserById,
  findUserByUsername,
  findUserByPhoneNumber,
  deleteUserById,
  normalizeAvatar,
};
