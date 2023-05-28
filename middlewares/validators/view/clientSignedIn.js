const isClientSignedIn = async (req, res, next) => {
  if (!!req.session.userId) {
    res.status(302).redirect("http://localhost:3000/dashboard");
  }
  next();
};

const notClientSignedIn = async (req, res, next) => {
  if (!req.session.userId) {
    res.status(302).redirect("http://localhost:3000/auth");
  }
  next();
};

module.exports = { notClientSignedIn, isClientSignedIn };
