const createError = require("http-errors");

const User = require("../models/User");

const {
  CreateUserDto,
  ReadUserDto,
  UserLoginDto,
} = require("../utils/user-dto");

const createUser = async (req, res, next) => {
  const existUsername = await User.exists({ username: req.body.username });
  console.log(existUsername);
  if (!!existUsername) {
    return next(createError(409, "These username is used before!"));
  }
  const existPhoneNumber = await User.exists({
    phoneNumber: req.body.phoneNumber,
  });
  if (!!existPhoneNumber) {
    return next(createError(409, "These phone number is used before!"));
  }
  const newUser = new User(new CreateUserDto(req.body));

  try {
    const result = await newUser.save();
    res.status(201).json({
      status: "success",
      data: new ReadUserDto(result),
    });
  } catch (error) {
    next(createError(500, "Create new User > " + error));
  }
};

const loginUser = async (req, res, next) => {
  const loginInfo = new UserLoginDto(req.body);

  const targetUser = await User.findOne({ username: loginInfo.username });
  if (!targetUser) return next(createError(404, "User not found"));

  const passwordMatch = await targetUser.validatePassword(loginInfo.password);
  if (!passwordMatch) return next(createError(404, "User not found"));
  req.session.userId = targetUser._id;
  console.log(req.session);
  res.json({
    status: "success",
    data: loginInfo,
  });
};

module.exports = { createUser, loginUser };
