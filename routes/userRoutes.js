const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();
router.route("/signup").post(authController.signup);
router
  .route("/")
  .delete(userController.deleteUsers)
  .get(authController.getUser);
module.exports = router;
