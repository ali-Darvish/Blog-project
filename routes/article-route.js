const express = require("express");
const {
  isSignedIn,
} = require("../middlewares/validators/auth/isSignedIn-validation");
const {
  getAllUserArticles,
  createArticle,
} = require("../controllers/article-controller");
const {
  createArticleValidator,
} = require("../middlewares/validators/article/createArticle-validation");

const router = express.Router();

router.post("/", isSignedIn, createArticleValidator, createArticle);

router.get("/", isSignedIn, getAllUserArticles);

module.exports = router;
