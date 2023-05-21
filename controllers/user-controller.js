const createError = require("http-errors");

const { ReadUserDto, UpdateUserDto } = require("../dto/user-dto");
const { ResponseDto } = require("../dto/response-dto");
const { createNewUser } = require("../services/user-service");

const createUser = async (req, res, next) => {
  try {
    const result = await createNewUser(res.locals.user);
    req.session.userId = result._id;
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

const updateUser = async (req, res, next) => {
  const targetUser = res.locals.user;
  const updatedInfo = new UpdateUserDto(req.body);
  targetUser.firstname = updatedInfo.firstname ?? targetUser.firstname;
  targetUser.lastname = updatedInfo.lastname ?? targetUser.lastname;
  targetUser.username = updatedInfo.username ?? targetUser.username;
  targetUser.gender = updatedInfo.gender ?? targetUser.gender;
  try {
    const result = await targetUser.save();
    res
      .status(200)
      .json(
        new ResponseDto(
          "success",
          "User updated Successfully",
          new ReadUserDto(result)
        )
      );
  } catch (error) {
    next(createError(500, "Internal server error."));
  }
};
module.exports = { createUser, updateUser };
