const express = require("express");
const indexController = require("../controllers/indexController.js");
const router = express.Router();

router.get("/", indexController.getHomePageGet);
router.post("", indexController.deleteMessagePost);
router.get("/new_message", indexController.getNewMessagePageGet);
router.post("/new_message", indexController.addNewMessagePost);

module.exports = router;
