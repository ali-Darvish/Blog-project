const Joi = require("joi");
const createError = require("http-errors");

const { CreateCommentDto } = require("../../../dto/comment-dto");
const { findArticleById } = require("../../../services/article-service");
const { findUserById } = require("../../../services/user-service");

const createCommentValidationSchema = Joi.object({
  text: Joi.string().required().trim().min(3),
  author: Joi.string().min(24).max(24).required(),
  article: Joi.string().min(24).max(24).required(),
});

const createCommentValidator = async (req, res, next) => {
  try {
    const commentInfo = new CreateCommentDto(req.body);
    commentInfo.author = req.session.userId;

    const { error } = createCommentValidationSchema.validate(commentInfo, {
      abortEarly: false,
    });
    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }
    const targetArticle = await findArticleById(commentInfo.article);
    if (!targetArticle) {
      return next(
        createError(404, `Article: ${commentInfo.article} not found`)
      );
    }
    const author = await findUserById(commentInfo.author);

    if (!author) {
      return next(createError(404, `User: ${commentInfo.author} not found`));
    }

    res.locals.article = targetArticle;
    res.locals.user = author;
    next();
  } catch (error) {
    next(createError(500, "Internal Server Error" + error));
  }
};

module.exports = { createCommentValidator };
