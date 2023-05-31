const express = require("express");
const {
  isSignedIn,
} = require("../middlewares/validators/auth/isSignedIn-validation");
const {
  getAllUserArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteUserArticle,
} = require("../controllers/article-controller");
const {
  createArticleValidator,
} = require("../middlewares/validators/article/createArticle-validation");
const {
  existArticleValidator,
} = require("../middlewares/validators/article/existArticle-validator");
const {
  updateArticleValidator,
} = require("../middlewares/validators/article/updateArticle-validator");
const {
  isHisArticle,
} = require("../middlewares/validators/article/ownArticle-validator");

const router = express.Router();

router.post("/", isSignedIn, createArticleValidator, createArticle);

router.get("/", isSignedIn, getAllUserArticles);
router.get("/:id", isSignedIn, existArticleValidator, getArticleById);

router.patch(
  "/:id",
  isSignedIn,
  existArticleValidator,
  isHisArticle,
  updateArticleValidator,
  updateArticle
);

router.delete(
  "/:id",
  isSignedIn,
  existArticleValidator,
  isHisArticle,
  deleteUserArticle
);

module.exports = router;
