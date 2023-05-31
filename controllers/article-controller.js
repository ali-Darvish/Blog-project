const createError = require("http-errors");

const { ReadArticleDto, CreateArticleDto } = require("../dto/article-dto");
const {
  findAllUserArticles,
  createNewArticle,
  countAllUserDocuments,
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
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const userArticles = await findAllUserArticles(
      req.session.userId,
      Number(skip),
      Number(limit)
    );
    const total = await countAllUserDocuments(req.session.userId);
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
    console.log(targetArticle);
    const articleAuthor = targetArticle.author.toString();
    const currentUser = req.session.userId;
    res.status(200).json({
      editable: articleAuthor === currentUser ? true : false,
      response: new ResponseDto(
        "success",
        "Article found successfully",
        new ReadArticleDto(targetArticle)
      ),
    });
  } catch (error) {
    next(createError(500, "Internal server error."));
  }
};
module.exports = { getAllUserArticles, createArticle, getArticleById };
