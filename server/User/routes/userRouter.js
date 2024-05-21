const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const { userRegister } = require("../controllers/signup");
router.route("/").get(check);
router.route("/signup").post(userRegister);
module.exports = router;
