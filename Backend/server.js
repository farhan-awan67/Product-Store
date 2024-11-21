require("dotenv").config({ path: "../.env" }); // Adjust the path if necessary
const express = require("express");
const app = express();
const cors = require("cors");
// In your backend entry file (e.g., server.js or app.js)
const connectDb = require("./db");
const productRoutes = require("./routes/product");

const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true, // Allow credentials (like cookies)
  // optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/", productRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: "Page not found" });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Port listening on ${PORT} `);
});
