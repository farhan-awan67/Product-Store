const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // image: {
  //   url: { type: String, required: true },
  //   public_id: { type: String, required: true }, // Using public_id instead of filename
  // },
  image: {
    url: String,
    filename: String,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
