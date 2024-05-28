const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const { createTeam } = require("../controllers/create");
const { storeImg } = require("../controllers/storeImg");
const { multerMiddleware } = require("../middleware/multer");
router.route("/").get(check);
router.route("/create-team").post(createTeam);
router.route("/upload").post(multerMiddleware, storeImg);

module.exports = router;
