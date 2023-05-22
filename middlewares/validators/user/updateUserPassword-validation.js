const Joi = require("joi");
const createError = require("http-errors");

const { UpdateUserPasswordDto } = require("../../../dto/user-dto");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).*$/;

const updateUserPasswordValidationSchema = Joi.object({
  currentPassword: Joi.string().required().min(8),
  newPassword: Joi.string().required().min(8).regex(passwordRegex),
});

const updateUserPasswordValidator = async (req, res, next) => {
  const updatePasswordInfo = new UpdateUserPasswordDto(req.body);
  const { error } = updateUserPasswordValidationSchema.validate(
    updatePasswordInfo,
    {
      abortEarly: false,
    }
  );
  if (!!error) {
    const errorMessages = error.details
      .map((error) => error.message)
      .join("\n");
    return next(createError(400, errorMessages));
  }
  try {
    const targetUser = res.locals.user;
    const isPasswordMatch = await targetUser.validatePassword(
      updatePasswordInfo.currentPassword
    );
    if (!isPasswordMatch) {
      return next(createError(401, `Entered password doesn't match.`));
    }
    res.locals.user = targetUser;
    return next();
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

module.exports = { updateUserPasswordValidator };
