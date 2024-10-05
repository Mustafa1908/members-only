const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

let getSecretClubPageGet = async (req, res) => {
  res.render("secret_club");
};
let getSecretClubAdhesionPageGet = asyncHandler(async (req, res) => {
  res.render("secret_club_adhesion");
});

let secretClubAdhesionPost = [
  body("secretCode")
    .equals("30")
    .withMessage(`Incorrect secret code(The secret code is 30)`),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("secret_club_adhesion", {
        errors: errors.array(),
      });
    }

    await db.updateUserMembership(req.user.username);
    res.render("secret_club");
  }),
];

let getAdminAdhesionPageGet = async (req, res) => {
  res.render("admin_adhesion");
};

let adminAdhesionPost = [
  body("adminSecretCode")
    .equals("1908")
    .withMessage(`Incorrect secret code(The secret code is 1908)`),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("admin_adhesion", {
        errors: errors.array(),
      });
    }

    await db.updateUserAdmin(req.user.username);
    res.redirect("/");
  }),
];

module.exports = {
  getSecretClubPageGet,
  secretClubAdhesionPost,
  getSecretClubAdhesionPageGet,
  getAdminAdhesionPageGet,
  adminAdhesionPost,
};
