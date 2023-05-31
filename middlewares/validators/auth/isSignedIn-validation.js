const createError = require("http-errors");

const isSignedIn = async (req, res, next) => {
  if (!req.session.userId) {
    return next(createError(401, "Unathorized! Please sign in first."));
  }
  next();
};

const notSignedIn = async (req, res, next) => {
  if (!!req.session.userId) {
    return next(
      createError(409, "You Signed In before! Please sign out first.")
    );
  }
  next();
};

module.exports = { isSignedIn, notSignedIn };
