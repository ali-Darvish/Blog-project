const express = require("express");

const { updateUser } = require("../controllers/user-controller");
const {
  updateUserValidator,
} = require("../middlewares/validators/user/updateUser-validator");
const {
  existUserValidator,
} = require("../middlewares/validators/user/existUser-validation");

const router = express.Router();

router.patch("/:id", existUserValidator, updateUserValidator, updateUser);
// router.patch("/password", userSignInValidator, userSignIn);
// router.get("/signout", userSignOut);

module.exports = router;
