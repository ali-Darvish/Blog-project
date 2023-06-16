const express = require("express");

const {
  createComment,
  getArticleComments,
  updateComment,
  deleteComment,
} = require("../controllers/comment-controller");
const {
  createCommentValidator,
} = require("../middlewares/validators/comment/createComment-validator");
const {
  existArticleValidator,
} = require("../middlewares/validators/article/existArticle-validator");
const {
  isSignedIn,
} = require("../middlewares/validators/auth/isSignedIn-validation");
const {
  existCommentValidator,
} = require("../middlewares/validators/comment/existComment-validator");
const {
  hasCommentPermission,
} = require("../middlewares/validators/comment/hasCommentPermission-validator");
const {
  updateCommentValidator,
} = require("../middlewares/validators/comment/updateComment-validator");
const router = express.Router();

router.post("/", isSignedIn, createCommentValidator, createComment);

router.get("/:id", existArticleValidator, getArticleComments);

router.patch(
  "/:id",
  isSignedIn,
  existCommentValidator,
  hasCommentPermission,
  updateCommentValidator,
  updateComment
);

router.delete(
  "/:id",
  isSignedIn,
  existCommentValidator,
  hasCommentPermission,
  deleteComment
);

module.exports = router;
