const getAuthPage = (req, res, next) => {
  res.status(200).render("auth-page");
};
const getDashboardPage = async (req, res, next) => {
  res.status(200).render("user-dashboard");
};

const getExplorePage = async (req, res, next) => {
  res.status(200).render("explore-page");
};

module.exports = { getAuthPage, getDashboardPage, getExplorePage };
