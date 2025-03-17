const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addProductToCart = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const { productID, quantity } = req.body;
  const userID = req.user._id;
  let cart = await Cart.findOne({ userID });
  console.log(req.body);
  if (!cart) {
    // Create new cart if not present
    cart = new Cart({
      userID,
      items: [{ productID, quantity }],
    });
  } else {
    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productID.toString() === productID
    );

    if (itemIndex > -1) {
      // If product exists → Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If product doesn't exist → Add new product
      cart.items.push({ productID, quantity });
    }
  }

  await cart.save();
  res.status(201).json({
    status: "success",
    message: "product added to the cart successfully",
  });
});

exports.getCartProducts = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  console.log(userID, req.user);
  const cart = await Cart.findOne({ userID }).populate("items.productID");
  //chnage the comment
  if (!cart) {
    return next(new AppError("Cart is empty", 200));
  }

  res.status(200).json(cart);
});
