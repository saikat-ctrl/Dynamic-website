const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).redirect("/auth?error=Please login first");
    }
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Register.findOne({ _id: verifyUser._id, "tokens.token": token });
    if (!user) {
      return res.status(401).redirect("/auth?error=Invalid session. Please login again.");
    }
    req.token = token;
    req.user = user;
    res.set("Cache-Control", "no-store");
    next();
  } catch (error) {
    res.status(401).redirect("/auth?error=Session expired. Please login again.");
  }
};
module.exports = auth;