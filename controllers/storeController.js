const Store = require("../models/storeModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.createStore = catchAsync(async (req, res, next) => {
  const { name, address, contact, operatingHours } = req.body;

  // Generate a 6-digit unique ID
  const uniqueID = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits

  const store = await Store.create({
    name,
    address,
    contact,
    operatingHours,
    uniqueID, // Save the unique ID in the store schema
  });

  console.log(uniqueID);
  res.status(201).json({ store, uniqueID });
});
exports.getAllStores = catchAsync(async (req, res) => {
  const stores = await Store.find();
  res.status(200).json(stores);
});

exports.getStoreByID = catchAsync(async (req, res) => {
  const { id } = req.params;

  const store = await Store.findById(id);
  if (!store) {
    return res.status(404).json({ message: "Store not found" });
  }

  res.status(200).json(store);
});

exports.addProduct = catchAsync(async (req, res) => {
  const { storeID } = req.params;
  const { name, description, price, category } = req.body;

  // Check if store exists
  const store = await Store.findById(storeID);
  if (!store) {
    return res.status(404).json({ message: "Store not found" });
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    storeId,
  });

  res.status(201).json(product);
});

exports.updateInventory = catchAsync(async (req, res) => {
  const { productId, stock } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.stock = stock;
  await product.save();

  res.status(200).json({ message: "Inventory updated successfully", product });
});

exports.deleteStores = catchAsync(async (req, res) => {
  await Store.deleteMany(); // Deletes all categories

  res.status(200).json({ message: "All store deleted successfully" });
});
