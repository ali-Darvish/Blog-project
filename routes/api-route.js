const express = require("express");
const router = express.Router();

const authRoute = require("./auth-route");
const userRoute = require("./user-route");
const articleRoute = require("./article-route");
const commentRoute = require("./comment-route");
const {
  isSignedIn,
} = require("../middlewares/validators/auth/isSignedIn-validation");

router.use("/auth", authRoute);
router.use("/user", isSignedIn, userRoute);
router.use("/article", articleRoute);
router.use("/comment", commentRoute);

module.exports = router;
