const Joi = require("joi");
const createError = require("http-errors");
const { CreateArticleDto } = require("../../../dto/article-dto");

//   author,

const createArticleValidationSchema = Joi.object({
  title: Joi.string().required().trim().min(3),
  brief: Joi.string().trim().min(3).optional(),
  thumbnail: Joi.string().required().trim().min(3),
  content: Joi.string().required().min(3),
  images: Joi.array().optional(),
  author: Joi.string().required(),
});

const createArticleValidator = async (req, res, next) => {
  try {
    const newArticleInfo = new CreateArticleDto(req.body);
    newArticleInfo.author = req.session.userId;
    const { error } = createArticleValidationSchema.validate(newArticleInfo, {
      abortEarly: false,
    });
    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }
    next();
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

module.exports = { createArticleValidator };
