const getRegisterPage = (req, res, next) => {
  res.render("register-page");
};

const getLoginPage = (req, res, next) => {
  res.render("login-page");
};

module.exports = { getRegisterPage, getLoginPage };
