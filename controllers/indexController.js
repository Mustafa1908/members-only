const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

let getHomePageGet = async (req, res) => {
  let allMessages = await db.getAllMessages();
  res.render("index", { user: req.user, allMessages: allMessages });
};

let getNewMessagePageGet = async (req, res) => {
  if (res.locals.currentUser === undefined) {
    res.redirect("/");
    return;
  }
  res.render("new_message");
};

let addNewMessagePost = [
  body("message_title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage(`User name must be between 5 and 100 characters`),
  body("message")
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage(`First name must be between 20 and 1000 characters`),
  asyncHandler(async (req, res, next) => {
    let messageDate = new Date();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("new_message", {
        errors: errors.array(),
      });
    }

    await db.createNewMessage(
      res.locals.currentUser.username,
      req.body,
      messageDate
    );
    res.redirect("/");
  }),
];

let deleteMessagePost = asyncHandler(async (req, res, next) => {
  await db.deleteMessage(req.body.messageTitle);

  res.redirect("/");
});

module.exports = {
  getHomePageGet,
  getNewMessagePageGet,
  addNewMessagePost,
  deleteMessagePost,
};
