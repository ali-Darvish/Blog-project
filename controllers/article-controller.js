const createError = require("http-errors");

const { ReadArticleDto, CreateArticleDto } = require("../dto/article-dto");
const {
  findAllUserArticles,
  createNewArticle,
} = require("../services/article-service");
const { ResponseDto } = require("../dto/response-dto");

const createArticle = async (req, res, next) => {
  const newArticleInfo = new CreateArticleDto(req.body);
  newArticleInfo.author = req.session.userId;
  const result = await createNewArticle(newArticleInfo);
  res
    .status(201)
    .json(new ResponseDto("success", "Article created successfully", result));
};

const getAllUserArticles = async (req, res, next) => {
  try {
    const userArticles = await findAllUserArticles(req.session.userId);
    if (!userArticles.length) {
      return next(createError(404, "Articles not found."));
    }

    res.status(200).json(
      new ResponseDto(
        "success",
        "User Articles Found Successfully",
        userArticles.map((article) => new ReadArticleDto(article))
      )
    );
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

module.exports = { getAllUserArticles, createArticle };
