const createError = require("http-errors");

const { ResponseDto } = require("../dto/response-dto");

const getAuthPage = (req, res, next) => {
  if (!!req.session.userId) {
    return res
      .status(302)
      .json(
        new ResponseDto(
          "redirect",
          "You signed in before. Please sign out first.",
          "http://localhost:3000/dashboard"
        )
      );
  }
  res.status(200).render("auth-page");
};
// {
//       status: "Found",
//       message: "You have logged in before. Please logout first.",
//     }
const getDashboardPage = async (req, res, next) => {
  if (!req.session.userId) {
    return next(createError(401, "Unauthorized! Please login first."));
  }

  res.status(200).render("user-dashboard");
};

module.exports = { getAuthPage, getDashboardPage };
