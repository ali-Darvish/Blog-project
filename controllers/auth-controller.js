const createError = require("http-errors");

const { ResponseDto } = require("../dto/response-dto");
const { ReadUserDto } = require("../dto/user-dto");

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
  if (!req.session.userId) {
    return next(createError(401, "Unauthorized! Please sign in first."));
  }
  req.session.destroy();
  res.status(204).json(new ResponseDto("success", "Signed out successfully"));
};

module.exports = { userSignIn, userSignOut };
