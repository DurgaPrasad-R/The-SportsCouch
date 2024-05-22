const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const { createSession } = require("../controllers/create");
router.route("/").get(check);
router.route("/create-session").post(createSession);

module.exports = router;
