const Article = require("../database/models/article-model");

const createNewArticle = (newArticleInfo) => {
  const newArticle = new Article(newArticleInfo);

  return newArticle.save();
};

const findAllUserArticles = (id, skip, limit) => {
  return Article.find({ author: id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};
const countAllUserArticles = (id) => {
  return Article.countDocuments({ author: id });
};
const findUserArticleById = (userId, articleId) => {
  return Article.find({
    author: userId,
    _id: articleId,
  });
};
const findArticleById = (articleId) => {
  return Article.findOne({
    _id: articleId,
  });
};

module.exports = {
  findAllUserArticles,
  countAllUserArticles,
  createNewArticle,
  findUserArticleById,
  findArticleById,
};
