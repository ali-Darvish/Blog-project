const Joi = require("joi");
const createError = require("http-errors");

const { UserSignInDto } = require("../../../dto/auth-dto");
const { findUserByUsername } = require("../../../services/user-service");

const userSignInValidationSchema = Joi.object({
  username: Joi.string().required().trim().min(3).max(30),
  password: Joi.string().required().min(8),
});

const userSignInValidator = async (req, res, next) => {
  try {
    const signInInfo = new UserSignInDto(req.body);
    const { error } = userSignInValidationSchema.validate(signInInfo, {
      abortEarly: false,
    });

    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }

    const targetUser = await findUserByUsername(signInInfo.username);
    if (!targetUser) {
      return next(createError(401, `Username or password doesn't match.`));
    }

    const isMatch = await targetUser.validatePassword(signInInfo.password);
    if (!isMatch) {
      return next(createError(401, `Username or password doesn't match.`));
    }
    res.locals.user = targetUser;
    next();
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

module.exports = { userSignInValidator };
