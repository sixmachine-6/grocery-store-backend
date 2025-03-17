const express = require("express");
const authController = require("./../controllers/authController");
const cartController = require("./../controllers/cartController");
const productController = require("./../controllers/productController");
const router = express.Router();

router
  .route("/")
  .post(productController.insertProducts)
  .delete(productController.deleteProducts)
  .get(productController.getAllProducts);
// .post(productController.createProduct);

module.exports = router;
