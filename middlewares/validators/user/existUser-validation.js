const createError = require("http-errors");

const { findUserById } = require("../../../services/user-service");

const existUserValidator = async (req, res, next) => {
  const { id } = req.params;
  try {
    let targetUser = await findUserById(id);
    if (!targetUser) {
      return next(createError(404, "User not found"));
    }
    if (targetUser._id.toString() !== req.session.userId) {
      return next(
        createError(
          403,
          "Access Denied! You haven't permision to access this route."
        )
      );
    }
    res.locals.user = targetUser;
    return next();
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

module.exports = { existUserValidator };
