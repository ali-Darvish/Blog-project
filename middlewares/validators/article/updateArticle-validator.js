const Joi = require("joi");
const createError = require("http-errors");
const { UpdateArticleDto } = require("../../../dto/article-dto");

const updateArticleValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).optional(),
  brief: Joi.string().trim().min(3).optional(),
  thumbnail: Joi.string().trim().min(3).optional(),
  content: Joi.string().min(3).optional(),
  images: Joi.array().optional(),
});

const updateArticleValidator = async (req, res, next) => {
  const newArticleData = new UpdateArticleDto(req.body);
  const { error } = updateArticleValidationSchema.validate(newArticleData, {
    abortEarly: false,
  });
  if (!!error) {
    const errorMessages = error.details
      .map((error) => error.message)
      .join("\n");
    return next(createError(400, errorMessages));
  }

  return next();
};

module.exports = { updateArticleValidator };
