const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const fetchUser = require("../middleware/fetchUser");
const {
  createSession,
  getSessionsUser,
  getOtherSessions,
  cancelSessionById,
  joinSessionById,
  deleteSessionById,
  deleteSessionsByTeam,
  fetchSessionByUser,
  groupByStatus,
  groupBySport,
} = require("../controllers/create");
router.route("/").get(check);
router.route("/fetchSessionByUser").get(fetchSessionByUser);
router.route("/groupByStatus").get(groupByStatus);
router.route("/groupBySport").get(groupBySport);
router.route("/create-session").post(fetchUser, createSession);
router.route("/get-sessions").get(fetchUser, getSessionsUser);
router.route("/get-other-sessions").get(fetchUser, getOtherSessions);
router.route("/cancel/:sessionId").post(fetchUser, cancelSessionById);
router.route("/join/:sessionId").post(fetchUser, joinSessionById);
router.route("/delete/:sessionId").delete(fetchUser, deleteSessionById);
router
  .route("/delete-sessions/:teamId")
  .delete(fetchUser, deleteSessionsByTeam);
module.exports = router;
