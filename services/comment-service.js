const commentModel = require("../database/models/comment-model");
const CommentModel = require("../database/models/comment-model");
const { apiFeatures } = require("../utils/api-features");

const createNewComment = (newArticleInfo) => {
  const newComment = new CommentModel(newArticleInfo);
  return newComment.save();
};

const findArticleComments = (articleId, queryString) => {
  const articleComments = new apiFeatures(
    CommentModel.find({ article: articleId }),
    queryString
  )
    .paginate()
    .sort()
    .search();
  return articleComments.modelQuery.populate("author", {
    firstname: 1,
    lastname: 1,
    avatar: 1,
  });
};

const findCommentById = (commentId) => {
  return CommentModel.findOne({ _id: commentId });
};

const deleteCommentById = (commentId) => {
  return CommentModel.findOneAndDelete({ _id: commentId });
};
const deleteAllArticleComments = (articleId) => {
  return commentModel.deleteMany({ article: articleId });
};
module.exports = {
  findArticleComments,
  findCommentById,
  createNewComment,
  deleteCommentById,
  deleteAllArticleComments,
};
