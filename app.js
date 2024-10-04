require("dotenv").config();

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const indexRouter = require("./routes/indexRouter");
const assetsPath = path.join(__dirname, "public");
const passwordUtils = require("./utils/passwordUtils");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

passwordUtils.verifyUser();
passwordUtils.serializeUser();
passwordUtils.deserializeUser();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
