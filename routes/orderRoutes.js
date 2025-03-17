const express = require("express");
const authController = require("./../controllers/authController");
const orderController = require("./../controllers/orderController");
const paymentController = require("./../controllers/paymentController");
const router = express.Router();
router
  .route("/")
  .post(authController.protect, orderController.createOrder)
  .get(authController.protect, orderController.getAllOrder);

router
  .route("/confirm-payment")
  .post(authController.protect, paymentController.confirmPayment);

router
  .route("/payment-status")
  .get(authController.protect, paymentController.getPaymentStatus);

router.route("/:id").get(authController.protect, orderController.getOrder);
module.exports = router;
