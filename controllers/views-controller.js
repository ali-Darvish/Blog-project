const getAuthPage = (req, res, next) => {
  res.status(200).render("auth-page");
};
const getDashboardPage = async (req, res, next) => {
  res.status(200).render("user-dashboard");
};

module.exports = { getAuthPage, getDashboardPage };
