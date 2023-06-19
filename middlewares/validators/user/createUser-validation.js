const Joi = require("joi");
const createError = require("http-errors");

const { CreateUserDto } = require("../../../dto/user-dto");
const {
  findUserByUsername,
  findUserByPhoneNumber,
} = require("../../../services/user-service");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).*$/;
const phoneNumberRegex = /^(0|\+98)9\d{9}$/;

const createUserValidationSchema = Joi.object({
  firstname: Joi.string().required().trim().min(3).max(30),
  lastname: Joi.string().required().trim().min(3).max(30),
  username: Joi.string().required().trim().min(3).max(30),
  password: Joi.string().required().min(8).regex(passwordRegex),
  gender: Joi.string().valid("male", "female", "not-set").default("not-set"),
  phoneNumber: Joi.array()
    .required()
    .items(Joi.string().regex(phoneNumberRegex).required()),
});

const createUserValidator = async (req, res, next) => {
  try {
    const newUserInfo = new CreateUserDto(req.body);
    const { error } = createUserValidationSchema.validate(newUserInfo, {
      abortEarly: false,
    });
    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }
    const duplicateUsername = await findUserByUsername(newUserInfo.username);
    if (!!duplicateUsername) {
      return next(
        createError(409, `${duplicateUsername.username} already taken before.`)
      );
    }

    const duplicatePhoneNumber = await findUserByPhoneNumber(
      req.body.phoneNumber
    );
    if (!!duplicatePhoneNumber) {
      return next(
        createError(
          409,
          `${duplicatePhoneNumber.phoneNumber} already taken before.`
        )
      );
    }
    res.locals.user = newUserInfo;
    next();
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

module.exports = { createUserValidator };
