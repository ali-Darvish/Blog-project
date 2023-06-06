const express = require("express");

const { createComment } = require("../controllers/comment-controller");
const {
  createCommentValidator,
} = require("../middlewares/validators/comment/createComment-validator");

const router = express.Router();

router.post("/", createCommentValidator, createComment);

module.exports = router;
