const Jimp = require("jimp");
const Article = require("../database/models/article-model");

const { join } = require("node:path");
const { unlink } = require("node:fs/promises");
const { apiFeatures } = require("../utils/api-features");
const articleModel = require("../database/models/article-model");

const createNewArticle = (newArticleInfo) => {
  const newArticle = new Article(newArticleInfo);

  return newArticle.save();
};

const findAllArticles = (queryString) => {
  const articleModel = new apiFeatures(Article.find(), queryString)
    .sort()
    .paginate()
    .search()
    .projection();
  return articleModel.modelQuery;
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

const deleteAllUserArticles = (userId) => {
  return articleModel.deleteMany({ author: userId });
};

const normalizeThumbnail = async (file) => {
  const { filename, path } = file;
  const thumbnail = await Jimp.read(path);
  thumbnail
    .cover(900, 600, Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE)
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
const normalizeImages = async (filesArray) => {
  const newFilePaths = [];
  for (const file of filesArray) {
    const { filename, path } = file;
    const image = await Jimp.read(path);
    image
      .cover(
        1200,
        600,
        Jimp.HORIZONTAL_ALIGN_CENTER,
        Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .quality(100)
      .write(
        join(
          __dirname,
          "..",
          "public",
          "images",
          "articleImages",
          `${filename.replace(/(\..+)$/, ".png")}`
        )
      );
    const newPath = filename.replace(/(\..+)$/, ".png");
    await unlink(path);
    newFilePaths.push(newPath);
  }
  return newFilePaths;
};

module.exports = {
  findAllArticles,
  findAllUserArticles,
  countAllUserArticles,
  createNewArticle,
  findUserArticleById,
  findArticleById,
  deleteArticleById,
  deleteAllUserArticles,
  normalizeThumbnail,
  normalizeImages,
};
