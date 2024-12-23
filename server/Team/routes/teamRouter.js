const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const fetchUser = require("../middleware/fetchUser");
const {
  createTeam,
  getTeams,
  getTeamById,
  deleteTeam,
  fetchTeamByUser,
} = require("../controllers/create");
const { storeImg } = require("../controllers/storeImg");
const { multerMiddleware } = require("../middleware/multer");
router.route("/").get(check);
router.route("/fetchTeamByUser").get(fetchTeamByUser);
router.route("/create-team").post(fetchUser, createTeam);
router.route("/upload").post(fetchUser, multerMiddleware, storeImg);
router.route("/get-teams").get(fetchUser, getTeams);
router.route("/:teamId").get(fetchUser, getTeamById);
router.route("/delete/:teamId").delete(deleteTeam);

module.exports = router;
