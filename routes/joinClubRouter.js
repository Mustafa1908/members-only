const express = require("express");
const joinClubController = require("../controllers/joinClubController.js");
const router = express.Router();

router.get("/secret_club", joinClubController.getSecretClubPageGet);
router.post("/secret_club_adhesion", joinClubController.secretClubAdhesionPost);
router.get(
  "/secret_club_adhesion",
  joinClubController.getSecretClubAdhesionPageGet
);
router.get("/admin_adhesion", joinClubController.getAdminAdhesionPageGet);
router.post("/admin_adhesion", joinClubController.adminAdhesionPost);

module.exports = router;
