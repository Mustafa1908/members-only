const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();

function verifyUser() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );
        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
}

function serializeUser() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
}

function deserializeUser() {
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = rows[0];

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports.verifyUser = verifyUser;
module.exports.serializeUser = serializeUser;
module.exports.deserializeUser = deserializeUser;