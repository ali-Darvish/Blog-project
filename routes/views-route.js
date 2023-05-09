const express = require("express");
const {
  getRegisterPage,
  getLoginPage,
  getDashboardPage,
} = require("../controllers/views-controllers");

const router = express.Router();

// Get Register Page
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.get("/dashboard", getDashboardPage);

module.exports = router;
