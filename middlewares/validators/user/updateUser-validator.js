const Joi = require("joi");
const createError = require("http-errors");

const { UpdateUserDto } = require("../../../dto/user-dto");
const {
  findUserByUsername,
} = require("../../../services/user-service");

const updateUserValidationSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30).optional(),
  lastname: Joi.string().trim().min(3).max(30).optional(),
  username: Joi.string().trim().min(3).max(30).optional(),
  gender: Joi.string()
    .valid("male", "female", "not-set")
    .default("not-set")
    .optional(),
});

const updateUserValidator = async (req, res, next) => {
  const targetUser = res.locals.user;
  try {
    const updatedInfo = new UpdateUserDto(req.body);
    const { error } = updateUserValidationSchema.validate(updatedInfo, {
      abortEarly: false,
    });
    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }

    if (
      !!updatedInfo.username &&
      updatedInfo.username !== targetUser.username
    ) {
      const duplicateUsername = await findUserByUsername(updatedInfo.username);
      if (!!duplicateUsername) {
        return next(
          createError(409, `${updatedInfo.username} already exists.`)
        );
      }
    }

    res.locals.user = targetUser;
    return next();
  } catch (error) {
    return next(createError(500, "Internal server error."));
  }
};

module.exports = { updateUserValidator };
