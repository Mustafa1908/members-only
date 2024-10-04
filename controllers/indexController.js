const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

let getHomePageGet = async (req, res) => {
  res.render("index", { user: req.user });
};

let getSignUpPageGet = async (req, res) => {
  res.render("sign_up");
};

let getSecretClubPageGet = async (req, res) => {
  res.render("secret_club");
};

let signUpPost = [
  body("userName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`User name must be between 1 and 100 characters`),
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`First name must be between 1 and 100 characters`),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Last name must be  between 1 and 100 characters`),
  body("password")
    .isLength({ min: 1, max: 300 })
    .withMessage(`Password must be between 8 and 300 characters`),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage(`Password are not the same`),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign_up", {
        errors: errors.array(),
      });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      try {
        await db.insertNewUser(req.body, hashedPassword);
        res.redirect("/");
      } catch (err) {
        return err;
      }
    });
  }),
];

let getSecretClubAdhesionPageGet = asyncHandler(async (req, res) => {
  res.render("secret_club_adhesion");
});

let secretClubAdhesionPost = [
  body("secretCode")
    .equals("30")
    .withMessage(`Incorrect secret code(The secret code is 30)`),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).render("secret_club_adhesion", {
        errors: errors.array(),
      });
    }

    res.render("secret_club");
  }),
];

let getLoginPageGet = async (req, res) => {
  res.render("log_in");
};

let loginPagePost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

module.exports = {
  getHomePageGet,
  getSignUpPageGet,
  signUpPost,
  getSecretClubPageGet,
  getSecretClubAdhesionPageGet,
  secretClubAdhesionPost,
  getLoginPageGet,
  loginPagePost,
};
