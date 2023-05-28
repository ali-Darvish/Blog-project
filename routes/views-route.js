const express = require("express");
const {
  getAuthPage,
  getDashboardPage,
} = require("../controllers/views-controller");
const {
  notClientSignedIn,
  isClientSignedIn,
} = require("../middlewares/validators/view/clientSignedIn");

const router = express.Router();

// Get Register Page
router.get("/auth", isClientSignedIn, getAuthPage);
router.get("/dashboard", notClientSignedIn, getDashboardPage);

module.exports = router;
