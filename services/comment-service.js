const CommentModel = require("../database/models/comment-model");

const createNewComment = (newArticleInfo) => {
  const newComment = new CommentModel(newArticleInfo);
  return newComment.save();
};

module.exports = { createNewComment };
