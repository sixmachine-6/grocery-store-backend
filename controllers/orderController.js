const Order = require("../models/orderModel");
const catchAsync = require("./../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { orderItems, shippingAddress, shippingCharges, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items provided" });
  }

  console.log(req.body);

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    shippingCharges,
    totalPrice,
  });
  console.log(order);

  res.status(201).json(order);
});

exports.getAllOrder = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId })
    .populate("orderItems.product", "name price")
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
});

exports.getOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("orderItems.product", "name price description")
    .populate("user");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(order);
});
