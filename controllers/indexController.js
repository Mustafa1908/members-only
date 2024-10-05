const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

let getHomePageGet = async (req, res) => {
  let allMessages = await db.getAllMessages();
  res.render("index", { user: req.user, allMessages: allMessages });
};

let getNewMessagePageGet = async (req, res) => {
  if (res.locals.currentUser === undefined) {
    console.log("You need to be connected to write a new message");
    res.redirect("/");
    return;
  }
  res.render("new_message");
};

let addNewMessagePost = asyncHandler(async (req, res, next) => {
  let messageDate = new Date();

  await db.createNewMessage(
    res.locals.currentUser.username,
    req.body,
    messageDate
  );
  res.redirect("/");
});

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
