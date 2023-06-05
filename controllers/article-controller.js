const createError = require("http-errors");
const { unlink } = require("node:fs/promises");
const {
  ReadArticleDto,
  CreateArticleDto,
  DetailArticleDto,
  UpdateArticleDto,
} = require("../dto/article-dto");

const {
  findAllUserArticles,
  createNewArticle,
  countAllUserArticles,
  deleteArticleById,
  normalizeThumbnail,
  findArticleById,
  normalizeImages,
} = require("../services/article-service");

const { ResponseDto } = require("../dto/response-dto");
const { multerUpload } = require("../utils/multer");
const { join } = require("node:path");

const uploadArticleImages = multerUpload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

const createArticle = async (req, res, next) => {
  const newArticleInfo = new CreateArticleDto(req.body);
  newArticleInfo.author = req.session.userId;
  const avatarFileName = await normalizeThumbnail(req.files.thumbnail[0]);
  newArticleInfo.thumbnail = avatarFileName;
  const imagesFileName = await normalizeImages(req.files.images);
  newArticleInfo.images = imagesFileName;
  console.log(newArticleInfo);
  const result = await createNewArticle(newArticleInfo);
  res
    .status(201)
    .json(new ResponseDto("success", "Article created successfully", result));
};

const getAllUserArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const userArticles = await findAllUserArticles(
      req.session.userId,
      Number(skip),
      Number(limit)
    );
    const total = await countAllUserArticles(req.session.userId);
    if (!userArticles.length) {
      return next(createError(404, "Articles not found."));
    }

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      total_articles: total,
      total_pages: Math.ceil(total / limit),
      ...new ResponseDto(
        "success",
        "User Articles Found Successfully",
        userArticles.map((article) => new ReadArticleDto(article))
      ),
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const targetArticle = res.locals.article;
    const articleAuthor = targetArticle.author.toString();
    const currentUser = req.session.userId;
    const populatedArticle = await findArticleById(targetArticle._id).populate(
      "author",
      { firstname: 1, lastname: 1, avatar: 1, _id: 0 }
    );

    res.status(200).json({
      editable: articleAuthor === currentUser ? true : false,
      response: new ResponseDto(
        "success",
        "Article found successfully",
        new DetailArticleDto(populatedArticle)
      ),
    });
  } catch (error) {
    next(createError(500, "Internal server error."));
  }
};

const updateArticle = async (req, res, next) => {
  const targetArticle = res.locals.article;
  const newArticleData = new UpdateArticleDto(req.body);

  targetArticle.title = newArticleData.title ?? targetArticle.title;

  if (!!req.files.thumbnail[0]) {
    const newThumbnail = await normalizeThumbnail(req.files.thumbnail[0]);
    await unlink(
      join(
        __dirname,
        "..",
        "public",
        "images",
        "thumbnails",
        targetArticle.thumbnail
      )
    );
    targetArticle.thumbnail = newThumbnail;
  }

  targetArticle.brief = newArticleData.brief ?? targetArticle.brief;
  targetArticle.content = newArticleData.content ?? targetArticle.content;

  if (!!req.files.images) {
    const newImages = await normalizeImages(req.files.images);
    for (const image of targetArticle.images) {
      await unlink(
        join(__dirname, "..", "public", "images", "articleImages", image)
      );
    }
    targetArticle.images = newImages;
  }

  try {
    const result = await targetArticle.save();
    res
      .status(200)
      .json(
        new ResponseDto(
          "success",
          "Article updated Successfully",
          new DetailArticleDto(result)
        )
      );
  } catch (error) {
    next(createError(500, "Internal server error."));
  }
};

const deleteUserArticle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deleteArticleById(id);
    res
      .status(204)
      .json(new ResponseDto("success", "Article deleted successfully", result));
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

module.exports = {
  getAllUserArticles,
  uploadArticleImages,
  createArticle,
  getArticleById,
  updateArticle,
  deleteUserArticle,
};
