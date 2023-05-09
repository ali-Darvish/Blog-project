const express = require("express");
const router = express.Router();

const usersRouter = require("./users-route");

/* User Routes. */
router.use("/users", usersRouter);

module.exports = router;
