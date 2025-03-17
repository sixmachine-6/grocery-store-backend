const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
console.log(process.env.STRIPE_SECRET_KEY);
console.log(process.env.DB_STRING);
mongoose
  .connect(process.env.DB_STRING)
  .then(() => console.log("db connection successful"))
  .catch((err) => console.log(err.message));

app.listen(5000, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
