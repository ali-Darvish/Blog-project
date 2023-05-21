const express = require("express");
const router = express.Router();

const authRoute = require("./auth-route");

/* Auhtentication Routes. */
router.use("/auth", authRoute);

module.exports = router;
