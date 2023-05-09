const getRegisterPage = (req, res, next) => {
  res.render("register-page");
};

const getLoginPage = (req, res, next) => {
  res.render("login-page");
};

const getDashboardPage = (req, res, next) => {
  if(req.session)
  res.render("user-dashboard");
};

module.exports = { getRegisterPage, getLoginPage, getDashboardPage };
