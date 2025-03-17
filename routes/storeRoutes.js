const express = require("express");
const storeController = require("./../controllers/storeController");
const authController = require("./../controllers/authController");
const router = express.Router();
router
  .route("/")
  .post(storeController.createStore)
  .get(storeController.getAllStores)
  .delete(storeController.deleteStores);
router.route("/:id").get(storeController.getStoreByID);
router.route("/:id").post(storeController.updateInventory);

router.route("/store-login").post(authController.sellerLogin);
module.exports = router;
