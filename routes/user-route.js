const express = require("express");

const { updateUser } = require("../controllers/user-controller");
const {
  updateUserValidator,
} = require("../middlewares/validators/user/updateUser-validator");

const router = express.Router();

router.patch("/:id", updateUserValidator, updateUser);
// router.patch("/password", userSignInValidator, userSignIn);
// router.get("/signout", userSignOut);

module.exports = router;
