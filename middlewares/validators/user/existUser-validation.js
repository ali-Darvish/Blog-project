const createError = require("http-errors");

const { findUserById } = require("../../../services/user-service");

const existUserValidator = async (req, res, next) => {
  const { id } = req.params;
  try {
    let targetUser = await findUserById(id);
    if (!targetUser) {
      return next(createError(404, "User not found"));
    }
    res.locals.user = targetUser;
    next();
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

module.exports = { existUserValidator };
