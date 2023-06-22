const createError = require("http-errors");

const { ResponseDto } = require("../dto/response-dto");
const { ReadUserDto } = require("../dto/user-dto");
const { findUserById } = require("../services/user-service");

const userSignIn = async (req, res, next) => {
  try {
    const targetUser = res.locals.user;
    req.session.userId = targetUser._id;

    res
      .status(200)
      .json(
        new ResponseDto(
          "success",
          "Signed in successfully.",
          new ReadUserDto(targetUser)
        )
      );
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

const userSignOut = (req, res, next) => {
  req.session.destroy();
  res.status(204).json(new ResponseDto("success", "Signed out successfully."));
};

const checkUserPassword = async (req, res, next) => {
  const { id } = req.params;
  const { currentPassword } = req.body;
  if (!currentPassword) {
    return next(createError(400, "Please enter your current password"));
  }
  const targetUser = await findUserById(id);
  if (!targetUser) {
    return next(createError(404, "User not found"));
  }
  const isMatch = await targetUser.validatePassword(currentPassword);
  if (!isMatch) {
    return next(createError(401, "Password doesn't match"));
  }
  res.status(200).json(new ResponseDto("success", "Password is match"));
};

module.exports = { userSignIn, userSignOut, checkUserPassword };
