const createError = require("http-errors");

const { CreateCommentDto, ReadCommentDto } = require("../dto/comment-dto");
const {
  createNewComment,
  findArticleComments,
  deleteCommentById,
} = require("../services/comment-service");
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

const getArticleComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await findArticleComments(id, req.query);
    res.json(
      new ResponseDto(
        "success",
        `Article #${id}'s comments found successfully.`,
        comments.map((comment) => new ReadCommentDto(comment))
      )
    );
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

const updateComment = async (req, res, next) => {
  const targetComment = res.locals.comment;
  targetComment.text = req.body.text;
  try {
    const result = await targetComment.save();
    res
      .status(200)
      .json(
        new ResponseDto(
          "success",
          "Comment updated successfully",
          new ReadCommentDto(result)
        )
      );
  } catch (error) {}
};

const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await deleteCommentById(id);
    res
      .status(204)
      .json(new ResponseDto("success", "Comment deleted successfully."));
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
module.exports = {
  createComment,
  getArticleComments,
  updateComment,
  deleteComment,
};
