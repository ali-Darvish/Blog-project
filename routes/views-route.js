const express = require("express");
const {
  getRegisterPage,
  getLoginPage,
} = require("../controllers/views-controllers");

const router = express.Router();

// Get Register Page
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);

module.exports = router;
