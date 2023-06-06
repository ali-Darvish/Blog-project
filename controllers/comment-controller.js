const createError = require("http-errors");

const { CreateCommentDto, ReadCommentDto } = require("../dto/comment-dto");
const { createNewComment } = require("../services/comment-service");
const { ResponseDto } = require("../dto/response-dto");

const createComment = async (req, res, next) => {
  try {
    const newComment = await createNewComment(new CreateCommentDto(req.body));
    res
      .status(201)
      .json(
        new ResponseDto(
          "success",
          "Comment created successfully",
          new ReadCommentDto(newComment)
        )
      );
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

module.exports = { createComment };
