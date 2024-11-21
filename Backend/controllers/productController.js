const Product = require("../models/products");

const getProducts = async (req, res) => {
  // res.send("hello");
  const data = await Product.find({});
  res.status(200).json(data);
};

const addProduct = async (req, res) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;

    if (!req.file) {
      console.log("file not found");
    }

    if (!req.body.name || !req.body.price || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all the fileds" });
    }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      image: { url, filename },
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "failed" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // If no product ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });
    }

    // Find the product by ID and update it
    const productToUpdate = await Product.findByIdAndUpdate(
      id,
      { ...req.body }, // Update the product with the request body
      { new: true, runValidators: true } // new: true ensures the updated document is returned
    );

    // If product not found
    if (!productToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // If a new image is uploaded, update the image field
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      productToUpdate.image = { url, filename };
    }

    // Save the updated product document
    await productToUpdate.save();

    // Send the updated product data as a response
    return res.status(200).json({ success: true, data: productToUpdate });
  } catch (error) {
    console.error(error);
    // Handle server error
    return res.status(500).json({
      success: false,
      message: "Server error. Could not update the product.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const dletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: dletedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "failed" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
