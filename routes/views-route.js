const express = require("express");
const {
  getAuthPage,
  getDashboardPage,
  getExplorePage,
  getArticlePage,
} = require("../controllers/views-controller");
const {
  notClientSignedIn,
  isClientSignedIn,
} = require("../middlewares/validators/view/clientSignedIn");

const router = express.Router();

router.get("/auth", isClientSignedIn, getAuthPage);
router.get("/dashboard", notClientSignedIn, getDashboardPage);
router.get("/explore", isClientSignedIn, getExplorePage);
router.get("/article/:id", notClientSignedIn, getArticlePage);

module.exports = router;
