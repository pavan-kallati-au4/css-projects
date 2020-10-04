const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/user").get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);
module.exports = router;
