const createError = require("http-errors");
const { findCommentById } = require("../../../services/comment-service");

const existCommentValidator = async (req, res, next) => {
  const { id } = req.params;
  try {
    let targetComment = await findCommentById(id);
    if (!targetComment) {
      return next(createError(404, `Comment: ${id} not found`));
    }
    res.locals.comment = targetComment;
    return next();
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

module.exports = { existCommentValidator };
