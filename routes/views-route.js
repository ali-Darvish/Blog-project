const express = require("express");
const {
  getAuthPage,
  getDashboardPage,
} = require("../controllers/views-controller");

const router = express.Router();

// Get Register Page
router.get("/auth", getAuthPage);
router.get("/dashboard", getDashboardPage);

module.exports = router;
