require("dotenv").config();

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const indexRouter = require("./routes/indexRouter");
const authentifacationRouter = require("./routes/authentificationRouter");
const joinClubRouter = require("./routes//joinClubRouter");
const assetsPath = path.join(__dirname, "public");
const passwordUtils = require("./utils/passwordUtils");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter, authentifacationRouter, joinClubRouter);

passwordUtils.verifyUser();
passwordUtils.serializeUser();
passwordUtils.deserializeUser();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
