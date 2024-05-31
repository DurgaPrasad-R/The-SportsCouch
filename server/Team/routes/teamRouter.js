const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const fetchUser = require("../middleware/fetchUser");
const { createTeam, getTeams } = require("../controllers/create");
const { storeImg } = require("../controllers/storeImg");
const { multerMiddleware } = require("../middleware/multer");
router.route("/").get(check);
router.route("/create-team").post(fetchUser, createTeam);
router.route("/upload").post(multerMiddleware, storeImg);
router.route("/get-teams").get(fetchUser, getTeams);

module.exports = router;
