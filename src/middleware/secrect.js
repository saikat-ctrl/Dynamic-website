const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const secrect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).render("error", { message: "Unauthorized: No token provided." });
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Register.findOne({ _id: verifyUser._id });

    if (!user) {
      return res.status(401).render("error", { message: "Unauthorized: User not found." });
    }

    // Check if the user is an owner
    if (user.owner !== true) {      
      return res.status(403).render("error", { message: "Access denied: Only owner can access this section." });
    }

    // Proceed if everything is valid
    req.token = token;
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).render("error", { message: "Unauthorized: Invalid token." });
  }
};

module.exports = secrect;
