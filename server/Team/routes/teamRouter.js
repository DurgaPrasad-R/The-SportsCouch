const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const { createTeam } = require("../controllers/create");
router.route("/").get(check);
router.route("/create-team").post(createTeam);

module.exports = router;
