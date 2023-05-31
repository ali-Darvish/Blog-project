const createError = require("http-errors");

const isHisArticle = async (req, res, next) => {
  const targetArticle = res.locals.article;
  if (targetArticle.author.toString() !== req.session.userId) {
    return next(
      createError(403, "You have not permission to modify this article.")
    );
  }

  return next();
};

module.exports = { isHisArticle };
