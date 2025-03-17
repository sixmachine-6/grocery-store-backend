const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.deleteUsers = catchAsync(async (req, res) => {
  await User.deleteMany(); // Deletes all categories

  res.status(200).json({ message: "All users deleted successfully" });
});
