const express = require("express");
const indexController = require("../controllers/indexController.js");
const router = express.Router();

router.get("/", indexController.getHomePageGet);
router.get("/sign_up", indexController.getSignUpPageGet);
router.post("/sign_up", indexController.signUpPost);
router.get(
  "/secret_club_adhesion",
  indexController.getSecretClubAdhesionPageGet
);
router.get("/secret_club", indexController.getSecretClubPageGet);
router.post("/secret_club_adhesion", indexController.secretClubAdhesionPost);
router.get("/log_in", indexController.getLoginPageGet);
router.post("/log_in", indexController.loginPagePost);

module.exports = router;
