const Article = require("../database/models/article-model");

const createNewArticle = (newArticleInfo) => {
  const newArticle = new Article(newArticleInfo);

  return newArticle.save();
};

const findAllUserArticles = (id) => {
  return Article.find({ author: id });
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
  createNewArticle,
  findUserArticleById,
  findArticleById,
};
