const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const multer = require("multer");
const { storage } = require("../cloudinaryConfig");
const upload = multer({ storage });

router.get("/products", getProducts);
router.post("/products", upload.single("image"), addProduct);
router.delete("/product/:id/delete", deleteProduct);
router.put("/product/:id/update", upload.single("image"), updateProduct);

module.exports = router;
