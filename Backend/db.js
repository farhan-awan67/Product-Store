require("dotenv").config(); // Adjust the path if necessary
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log(typeof process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (error) {
    console.log(`error ${error.message}`);
  }
};

module.exports = connectDb;
