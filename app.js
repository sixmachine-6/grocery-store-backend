const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");
const storeRouter = require("./routes/storeRoutes");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const orderRouter = require("./routes/orderRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST"],
  })
);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
