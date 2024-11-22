import React, { useContext } from "react";
import Product from "../components/Product";
import Modal from "../components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productContext } from "../context/productContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { products, isLoading } = useContext(productContext);
  return (
    <div className="text-white min-h-screen">
      <ToastContainer
        autoClose={5000} // Global auto close time for all toasts
        position="top-right"
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // Show newest toasts on top
        closeOnClick={true} // Close on click
        rtl={false} // Right-to-left (set to true if needed)
        pauseOnFocusLoss={false} // Pause when focus is lost
        draggable={false} // Make it non-draggable
      />
      <Modal />
      {isLoading ? (
        <div className="spinner">
          <div className="spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center gap-1">
          <p className="text-white">No products available</p>{" "}
          <Link to={"/create"} className="text-blue-700">
            add product
          </Link>
        </div> // Message if there are no products
      ) : (
        <Product /> // Render products if available
      )}
    </div>
  );
};

export default Home;
