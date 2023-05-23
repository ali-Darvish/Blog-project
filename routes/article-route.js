const express = require("express");
const {
  isSignedIn,
} = require("../middlewares/validators/auth/isSignedIn-validation");
const {
  getAllUserArticles,
  createArticle,
  getArticleById,
} = require("../controllers/article-controller");
const {
  createArticleValidator,
} = require("../middlewares/validators/article/createArticle-validation");
const { existArticleValidator } = require("../middlewares/validators/article/existArticle-validator");

const router = express.Router();

router.post("/", isSignedIn, createArticleValidator, createArticle);

router.get("/", isSignedIn, getAllUserArticles);
router.get("/:id", isSignedIn, existArticleValidator ,getArticleById);

module.exports = router;
