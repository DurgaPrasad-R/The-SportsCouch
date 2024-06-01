const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const fetchUser = require("../middleware/fetchUser");
const {
  createSession,
  getSessionsUser,
  getOtherSessions,
} = require("../controllers/create");
router.route("/").get(check);
router.route("/create-session").post(fetchUser, createSession);
router.route("/get-sessions").get(fetchUser, getSessionsUser);
router.route("/get-other-sessions").get(fetchUser, getOtherSessions);
module.exports = router;
