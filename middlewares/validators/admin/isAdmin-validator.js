const createError = require("http-errors");
const { findUserById } = require("../../../services/user-service");

const isAdmin = async (req, res, next) => {
  const targetUser = await findUserById(req.session.userId);
  if (targetUser.role !== "admin") {
    return next(createError(403, "Permission denied! You cannot do this."));
  }
  next();
};

module.exports = { isAdmin };
