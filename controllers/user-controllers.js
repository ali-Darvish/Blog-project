const createError = require("http-errors");

const User = require("../models/User");

const {
  CreateUserDto,
  ReadUserDto,
  UserLoginDto,
} = require("../utils/user-dto");

const createUser = async (req, res, next) => {
  const newUser = new User(new CreateUserDto(req.body));

  try {
    const existUsername = await User.exists({ username: req.body.username });
    if (!!existUsername) {
      return res.redirect("/register?errorMessage=Username is owned before!");
    }
    const existPhoneNumber = await User.exists({
      phoneNumber: req.body.phoneNumber,
    });
    if (!!existPhoneNumber) {
      return res.redirect(
        "/register?errorMessage=Phone number is used by another user!"
      );
    }

    const result = await newUser.save();
    // res.status(201).json({
    //   status: "success",
    //   data: new ReadUserDto(result),
    // });
    res.redirect("/login?message=Successfully Registered!");
  } catch (error) {
    next(createError(500, "Create new User > " + error));
  }
};

const loginUser = async (req, res, next) => {
  const loginInfo = new UserLoginDto(req.body);

  const targetUser = await User.findOne({ username: loginInfo.username });
  if (!targetUser)
    return res.redirect("/login?errorMessage=Username Or Password Is Wrong!");

  const passwordMatch = await targetUser.validatePassword(loginInfo.password);
  if (!passwordMatch)
    return res.redirect("/login?errorMessage=Username Or Password Is Wrong!");
  req.session.userId = targetUser._id;
  res.redirect("/dashboard");
};

const logoutUser = (req, res, next) => {
  req.session.destroy();
  res.json({
    status: "success",
    message: "Successfully logged out.",
  });
};

module.exports = { createUser, loginUser, logoutUser };
