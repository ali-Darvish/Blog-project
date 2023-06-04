const Jimp = require("jimp");
const Article = require("../database/models/article-model");

const { join } = require("node:path");
const { unlink } = require("node:fs/promises");

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

const deleteArticleById = (articleId) => {
  return Article.findByIdAndDelete(articleId);
};

const normalizeThumbnail = async (file) => {
  const { filename, path } = file;
  const thumbnail = await Jimp.read(path);
  thumbnail
    .cover(800, 600, Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(75)
    .write(
      join(
        __dirname,
        "..",
        "public",
        "images",
        "thumbnails",
        `${filename.replace(/(\..+)$/, ".png")}`
      )
    );
  const newPath = filename.replace(/(\..+)$/, ".png");
  await unlink(path);
  return newPath;
};

module.exports = {
  findAllUserArticles,
  countAllUserArticles,
  createNewArticle,
  findUserArticleById,
  findArticleById,
  deleteArticleById,
  normalizeThumbnail,
};
