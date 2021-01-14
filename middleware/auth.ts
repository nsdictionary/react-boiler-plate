import User from "../models/User";

const auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      return res.json({ ok: false, error: true });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

export default auth;
