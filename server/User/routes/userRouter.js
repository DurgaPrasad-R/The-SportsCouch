const express = require("express");
const router = express.Router();
const { check } = require("../controllers/check");
const { userRegister, userLogin } = require("../controllers/userController");
router.route("/").get(check);
router.route("/signup").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
