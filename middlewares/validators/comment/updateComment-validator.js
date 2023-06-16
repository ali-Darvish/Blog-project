const Joi = require("joi");
const createError = require("http-errors");

const { UpdateCommentDto } = require("../../../dto/comment-dto");

const updateCommentValidationSchema = Joi.object({
  text: Joi.string().required().trim().min(3),
});

const updateCommentValidator = async (req, res, next) => {
  try {
    const commentInfo = new UpdateCommentDto(req.body);
    const { error } = updateCommentValidationSchema.validate(commentInfo, {
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

module.exports = { updateCommentValidator };
