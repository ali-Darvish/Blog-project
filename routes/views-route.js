const express = require("express");
const {
  getAuthPage,
  getDashboardPage,
  getExplorePage,
} = require("../controllers/views-controller");
const {
  notClientSignedIn,
  isClientSignedIn,
} = require("../middlewares/validators/view/clientSignedIn");

const router = express.Router();

router.get("/auth", isClientSignedIn, getAuthPage);
router.get("/dashboard", notClientSignedIn, getDashboardPage);
router.get("/explore", isClientSignedIn, getExplorePage);

module.exports = router;
