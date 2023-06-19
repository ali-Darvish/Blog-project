const express = require("express");

const { createUser } = require("../controllers/user-controller");
const {
  userSignIn,
  userSignOut,
  checkUserPassword,
} = require("../controllers/auth-controller");
const {
  createUserValidator,
} = require("../middlewares/validators/user/createUser-validation");
const {
  userSignInValidator,
} = require("../middlewares/validators/auth/signin-validation");
const {
  isSignedIn,
  notSignedIn,
} = require("../middlewares/validators/auth/isSignedIn-validation");

const router = express.Router();

router.post("/register", notSignedIn, createUserValidator, createUser);

router.post("/signin", notSignedIn, userSignInValidator, userSignIn);

router.get("/signout", isSignedIn, userSignOut);

router.post("/checkPassword/:id", isSignedIn, checkUserPassword);

module.exports = router;
