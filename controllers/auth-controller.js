const createError = require("http-errors");

const { findUserByUsername } = require("../services/user-service");
const { ResponseDto } = require("../dto/response-dto");

const userSignIn = async (req, res, next) => {
  try {
    const loginInfo = new UserLoginDto(req.body);
    const targetUser = await findUserByUsername(loginInfo.username);
    if (!targetUser) {
      return next(createError(401, `Username or password not match.`));
    }
    const passwordMatch = await targetUser.validatePassword(loginInfo.password);
    if (!passwordMatch) {
      return next(createError(401, `$Username or password not match.`));
    }

    req.session.userId = targetUser._id;

    res.status(200).json(new ResponseDto("success", "Signed in successfully."));
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
