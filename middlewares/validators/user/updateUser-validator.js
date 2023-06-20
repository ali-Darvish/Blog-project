const Joi = require("joi");
const createError = require("http-errors");

const { UpdateUserDto } = require("../../../dto/user-dto");
const {
  findUserByUsername,
  findUserByPhoneNumber,
} = require("../../../services/user-service");

const phoneNumberRegex = /^(0|\+98)9\d{9}$/;

const updateUserValidationSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30).optional(),
  lastname: Joi.string().trim().min(3).max(30).optional(),
  username: Joi.string().trim().min(3).max(30).optional(),
  gender: Joi.string()
    .valid("male", "female", "not-set")
    .default("not-set")
    .optional(),
  phoneNumber: Joi.array()
    .items(Joi.string().regex(phoneNumberRegex).required())
    .optional(),
});

const updateUserValidator = async (req, res, next) => {
  try {
    const targetUser = res.locals.user;
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
    if (!!updatedInfo.phoneNumber) {
      for (let phone of updatedInfo.phoneNumber) {
        phone = phone.startsWith("0") ? `+98${phone.slice(1)}` : phone;
        if (!targetUser.phoneNumber.find((pn) => pn === phone)) {
          const duplicatePhoneNumber = await findUserByPhoneNumber(phone);
          if (!!duplicatePhoneNumber) {
            return next(
              createError(
                409,
                `${duplicatePhoneNumber.phoneNumber} already taken before.`
              )
            );
          }
        }
      }
    }

    res.locals.user = targetUser;
    return next();
  } catch (error) {
    return next(createError(500, "Internal server error." + error.message));
  }
};

module.exports = { updateUserValidator };
