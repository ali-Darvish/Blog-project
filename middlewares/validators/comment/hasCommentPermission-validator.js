const createError = require("http-errors");
const { findUserById } = require("../../../services/user-service");

const hasCommentPermission = async (req, res, next) => {
  try {
    const targetComment = res.locals.comment;
    const loggedInUser = await findUserById(req.session.userId);
    if (
      targetComment.author.toString() !== loggedInUser._id.toString() &&
      loggedInUser.role !== "admin"
    ) {
      return next(createError(403, `Permission denied! You cannot do this.`));
    }
    return next();
  } catch (error) {
    return next(createError(500, `Internal server error.`));
  }
};

module.exports = { hasCommentPermission };
