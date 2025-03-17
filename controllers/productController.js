const factory = require("./handlerFactory");
const Product = require("./../models/productModel");
const Category = require("./../models/categoryModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Store = require("../models/storeModel");

exports.insertProducts = catchAsync(async (req, res) => {
  const products = req.body;

  for (const product of products) {
    const category = await Category.findOne({ name: product.categoryName });
    if (!category) {
      return res
        .status(400)
        .json({ message: `Category not found for ${product.name}` });
    }

    const store = await Store.findOne({ name: product.storeName });
    if (!store) {
      return res
        .status(400)
        .json({ message: `Store not found for ${product.name}` });
    }

    // Create product and assign store ID
    const newProduct = await Product.create({
      name: product.name,
      description: product.description,
      price: product.price,
      category: category._id,
      storeID: store._id, // Link to store
      stock: product.stock,
    });
  }

  res.status(201).json({ message: "Products inserted successfully" });
});

exports.createProduct = catchAsync(async (req, res) => {
  const { name, description, price, categoryName, storeID, stock } = req.body;

  // Find category by name to get the _id
  const category = await Category.findOne({ name: categoryName });
  if (!category) return res.status(400).json({ message: "Invalid category" });

  // Check if store exists
  console.log(storeID);
  const store = await Store.findById(storeID);
  if (!store) return res.status(400).json({ message: "Invalid store ID" });
  console.log(store);
  // Create product with category and store _id
  const product = await Product.create({
    name,
    description,
    price,
    category: category._id,
    storeID: store._id,
    stock,
  });

  res.status(201).json(product);
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const products = await features.query;
  console.log(products);
  // SEND RESPONSE
  res.status(200).json(products);
});

exports.deleteProducts = catchAsync(async (req, res) => {
  await Product.deleteMany(); // Deletes all categories

  res.status(200).json({ message: "All product deleted successfully" });
});
