const express = require("express");
const categoryController = require("./../controllers/categoryController");
const router = express.Router();
router
  .route("/")
  .delete(categoryController.deleteCategories)
  .post(categoryController.postCategories)
  .get(categoryController.getAllCategories);
module.exports = router;
