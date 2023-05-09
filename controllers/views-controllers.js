const { findUserById } = require("../services/user-service");
const { ReadUserDto } = require("../utils/user-dto");

const getRegisterPage = (req, res, next) => {
  if (!!req.session.userId) return res.redirect("/dashboard");
  res.render("register-page");
};

const getLoginPage = (req, res, next) => {
  if (!!req.session.userId) return res.redirect("/dashboard");

  res.render("login-page");
};

const getDashboardPage = async (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  const targetUser = new ReadUserDto(await findUserById(req.session.userId));
  res.render("user-dashboard", targetUser);
};

module.exports = { getRegisterPage, getLoginPage, getDashboardPage };
