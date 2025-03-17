const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

exports.postCategories = catchAsync(async (req, res) => {
  const categories = req.body; // Expecting an array of category objects

  const createdCategories = await Category.insertMany(categories);

  res.status(201).json(createdCategories);
});

exports.deleteCategories = catchAsync(async (req, res) => {
  await Category.deleteMany(); // Deletes all categories

  res.status(200).json({ message: "All categories deleted successfully" });
});
