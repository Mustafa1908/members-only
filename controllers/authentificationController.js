const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

let getSignUpPageGet = async (req, res) => {
  res.render("sign_up");
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
let getLoginPageGet = async (req, res) => {
  res.render("log_in");
};

let loginPagePost = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      // Handle failed authentication
      console.log("an error occured");
      return res.redirect("/");
    }

    // Successful authentication
    req.logIn(user, async (err) => {
      let hour = 3600000;
      req.session.cookie.originalMaxAge = 14 * 24 * hour;
      res.redirect("/");
    });
  })(req, res, next);
});

let logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  getSignUpPageGet,
  signUpPost,
  getLoginPageGet,
  loginPagePost,
  logOutGet,
};
