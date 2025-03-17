const { default: mongoose } = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },

  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
  },

  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },

  operatingHours: {
    open: { type: String, required: true }, // Example: "09:00 AM"
    close: { type: String, required: true }, // Example: "10:00 PM"
  },
  uniqueID: {
    type: Number,
  },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
