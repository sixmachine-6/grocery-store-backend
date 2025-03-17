const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("AMAN", process.env.DB_STRING);
const catchAsync = require("../utils/catchAsync");

exports.createPaymentIntent = catchAsync(async (req, res) => {
  const { amount, currency } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

exports.confirmPayment = catchAsync(async (req, res) => {
  const { paymentIntentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

  res.status(200).json({ paymentIntent });
});

exports.getPaymentStatus = catchAsync(async (req, res) => {
  const { paymentIntentId } = req.params;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  res.status(200).json({ status: paymentIntent.status });
});
