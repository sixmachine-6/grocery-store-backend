const express = require("express");
const authController = require("./../controllers/authController");
const cartController = require("./../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, cartController.addProductToCart)
  .get(authController.protect, cartController.getCartProducts);

module.exports = router;
