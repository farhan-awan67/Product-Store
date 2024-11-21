import React from "react";
import Product from "../components/Product";
import Modal from "../components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="text-white">
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
      <Product />
    </div>
  );
};

export default Home;
