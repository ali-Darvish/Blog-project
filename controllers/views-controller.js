const { findUserById } = require("../services/user-service");

const getAuthPage = (req, res, next) => {
  res.status(200).render("auth-page");
};
const getDashboardPage = async (req, res, next) => {
  const blogger = await findUserById(req.session.userId);
  res.status(200).render("user-dashboard", blogger);
};

const getExplorePage = (req, res, next) => {
  res.status(200).render("explore-page");
};

module.exports = { getAuthPage, getDashboardPage, getExplorePage };
