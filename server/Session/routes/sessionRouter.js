const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const fetchUser = require("../middleware/fetchUser");
const { createSession } = require("../controllers/create");
router.route("/").get(check);
router.route("/create-session").post(fetchUser, createSession);

module.exports = router;
