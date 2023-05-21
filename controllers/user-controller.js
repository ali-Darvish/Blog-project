const createError = require("http-errors");

const { ReadUserDto } = require("../dto/user-dto");
const { ResponseDto } = require("../dto/response-dto");
const { createNewUser } = require("../services/user-service");

const createUser = async (_req, res, next) => {
  try {
    const result = await createNewUser(res.locals.user);
    res
      .status(201)
      .json(
        new ResponseDto(
          "success",
          "User registered successfully",
          new ReadUserDto(result)
        )
      );
  } catch (error) {
    next(createError(500, "Create new User > " + error));
  }
};

module.exports = { createUser };
