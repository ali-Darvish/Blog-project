const Article = require("../database/models/article-model");

const createNewArticle = (newArticleInfo) => {
  const newArticle = new Article(newArticleInfo);

  return newArticle.save();
};

const findAllUserArticles = (id) => {
  return Article.find({ author: id });
};

module.exports = { findAllUserArticles, createNewArticle };
