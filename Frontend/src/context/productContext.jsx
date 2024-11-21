import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editProduct, setEditProduct] = useState();

  const handleError = (error) => {
    if (error.response) {
      toast.error(
        `Error: ${error.response.data.message || "Something went wrong"}`
      );
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("Error: " + error.message);
    }
  };

  const addProduct = async (formData) => {
    try {
      const response = await axios.post(
        "https://product-store-322t.onrender.com/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.status === 201) {
        setTimeout(() => {
          toast.success(
            "Product added successfully!",
            {
              style: {
                backgroundColor: "white", // Set background color (Tomato red)
                color: "green", // Set text color (white)
                fontWeight: "bold", // Set font weight
                borderRadius: "10px", // Rounded corners
                marginTop: "2px", // margin top
              },
            },
            5000
          );
        });
        getProducts();
      } else {
        // If the status is not 201, show a failure toast
        toast.error("Failed to add the product.", {
          style: {
            backgroundColor: "white", // Set background color (Tomato red)
            color: "red", // Set text color (white)
            fontWeight: "bold", // Set font weight
            borderRadius: "10px", // Rounded corners
            marginTop: "2px", // margin top
          },
        });
      }
    } catch (error) {
      handleError(error);
    }
  };


  const getProducts = async () => {
    const products = await axios.get(
      "https://product-store-322t.onrender.com/products"
    );
    setProduct(products.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (pId) => {
    if (!pId) {
      console.log("Product Id is invalid");
      return;
    }
    try {
      const res = await axios.delete(
        `https://product-store-322t.onrender.com/product/${pId}/delete`
      );
      if (res.status === 200) {
        toast.success("Product deleted successfully!");
        setProduct((prevProducts) =>
          prevProducts.filter((product) => product._id !== pId)
        );
      } else {
        toast.error("Failed to delete Product");
      }
      // const productAfterDeletion = products.filter((product) => {
      //   return product._id !== pId;
      // });
      // console.log(productAfterDeletion);
      // setProduct(productAfterDeletion);
    } catch (error) {
      handleError(error);
    }
  };

  const updateProduct = async () => {
    try {
      const res = await axios.put(
        `https://product-store-322t.onrender.com/product/${editData._id}/update`,
        editProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product updated successfully!");
      } else {
        toast.error("Failed to update Product");
      }
      getProducts();
    } catch (error) {
      handleError(error);
    }
  };

  // useEffect to call updateProduct when editProduct changes
  useEffect(() => {
    if (editProduct) {
      updateProduct(); // Now safely call updateProduct once editProduct is set
    }
  }, [editProduct]); // Dependency on editProduct to track its changes

  return (
    <productContext.Provider
      value={{
        addProduct,
        products,
        showModel,
        setShowModel,
        editData,
        setEditData,
        editProduct,
        setEditProduct,
        deleteProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
