const createError = require("http-errors");
const { findArticleById } = require("../../../services/article-service");

const existArticleValidator = async (req, res, next) => {
  const { id } = req.params;
  try {
    let targetArticle = await findArticleById(id);
    if (!targetArticle) {
      return next(createError(404, "Article not found"));
    }
    res.locals.article = targetArticle;
    return next();
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

module.exports = { existArticleValidator };
