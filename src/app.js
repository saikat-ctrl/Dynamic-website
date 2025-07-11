const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcryptjs');
dotenv.config(); // Load environment variables
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");
const secrect = require('./middleware/secrect');
const logout = require('./middleware/logout');
const app = express();
require('./db/conn'); // MongoDB connection
const Register = require('./models/registers');
const Page = require('./models/pages');
const { log } = require('console');

const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;
const mongoUri = process.env.MONGO_URI;

// Paths
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Middleware
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

// Template engine setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// app.use((req, res, next) => {
//   res.locals.currentPath = req.path;
//   next();
// });
// Register helper to mark active nav link
hbs.registerHelper("isActiveRoute", function (currentPath, routePath) {
  return currentPath === routePath ? "active" : "";
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/auth", (req, res) => {
  const message = req.query.message || null;
  const error = req.query.error || null;
  res.render("auth", { message, error });
});
app.get("/secrect", secrect, (req, res) => {
  // console.log(`cookies ${req.cookies.jwt}`);
  res.render("secrect");
});
app.get("/admin/dashboard", auth, (req, res) => {
  res.status(200).render("admin_dashboard", { user: req.user });
});
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password1 } = req.body;
    const user = await Register.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password1, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    // Only now generate token and update login date
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'Strict'
    });
    user.l_date = new Date(); // Update last login date
    await user.save();
    if (user.type === 'admin') {
      return res.status(201).redirect("/admin/dashboard");
    } else {
      res.status(201).redirect("/dashboard");
    }
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
});
app.get("/logout", logout, (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currentElement) => {
      return currentElement.token !== req.token; // Remove the current token
    });
    res.clearCookie("jwt"); // Clear the JWT cookie
    console.log("Logout successful")
    req.user.save();
    res.status(200).redirect("/auth?message=Logout successful");
  } catch (error) {
    res.status(500).send("Logout error: " + error.message || error);
  }
});
app.get("/complete-logout", logout, (req, res) => {
  try {
    req.user.tokens = []; // Clear all tokens    
    res.clearCookie("jwt"); // Clear the JWT cookie
    console.log("Logout successful")
    req.user.save();
    res.status(200).redirect("/auth?message=Logout successful");
  } catch (error) {
    res.status(500).send("Logout error: " + error.message || error);
  }
});
app.get("/register", (req, res) => {
  const message = req.query.message || null;
  res.render("register", { message });
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password1, password2 } = req.body;

    if (!name || !email || !password1 || !password2) {
      return res.status(400).redirect('/register?message=All fields are required');
    }

    if (password1 !== password2) {
      return res.status(400).redirect('/register?message=Passwords do not match');
    }

    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).redirect('/register?message=Email already exists. Please Sign In.');
    }

    const register = new Register({
      name,
      email,
      password: password1, // Pre-save hook will hash this
    });

    await register.save(); // Save user to DB

    const token = await register.generateAuthToken(); // Save and return JWT

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });

    res.status(201).redirect("/dashboard");

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).redirect('/register?message=Server error occurred');
  }
});
app.get("/dashboard", auth, async (req, res) => {
  const userData = await Register.findById(req.user._id);
  res.status(200).render("dashboard", { user: req.user });
});
app.get("/servererror", (req, res) => {
  res.status(504).render("servererror", { message: "504 Gateway Timeout" });
});
app.get("/about", (req, res) => {
  res.render("aboutus");
});
app.get("/items", (req, res) => {
  res.render("items");
});
app.get("/services", (req, res) => {
  res.render("services");
});
app.get("/contact", (req, res) => {
  res.render("contactus");
});
//page settings
app.get("/homepage", (req, res) => {
  res.status(404).render("homepage", { error: "Page not found" });
});
app.get("/abouts", (req, res) => {
  res.status(404).render("about", { error: "Page not found" });
});
//page settings
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
