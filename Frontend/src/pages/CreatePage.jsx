import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "../context/productContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage = () => {
  const { addProduct } = useContext(productContext);
  const [data, setData] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //prevent defult form behaviour
    e.preventDefault();

    // Validate the form first
    const isValid = validateForm(data); // Validate the form data

    if (!isValid) {
      // If validation fails, don't proceed with the form submission
      return; // Exit early, no need to send data to the server
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image); // Append the file to FormData

    // use addproduct to sent data to backend
    await addProduct(formData);

    //reseting fileds
    setData({
      name: "",
      price: "",
      image: "",
    });
    navigate("/");
  };

  const validConfig = {
    name: [{ required: true, message: "please enter name" }],
    price: [{ required: true, message: "please enter price" }],
    image: [{ required: true, message: "please upload an image" }],
  };

  const validateForm = (formData) => {
    const errorsData = {};
    let isValid = true; // Flag to track if form is valid
    Object.entries(formData).forEach(([key, value]) => {
      validConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;

          toast.error(rule.message, {
            position: "top-right", // Position of the toast
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false, // Hide progress bar
            closeOnClick: true, // Close on click
            pauseOnHover: true, // Pause on hover
            draggable: true, // Allow drag
            style: {
              backgroundColor: "white", // Set background color (Tomato red)
              color: "red", // Set text color (white)
              fontWeight: "bold", // Set font weight
              borderRadius: "10px", // Rounded corners
              marginTop: "2px", // margin top
            },
          });
          isValid = false; // Mark as invalid if any field fails
        }
      });
    });
    setError(errorsData);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files[0]) {
      setData((prev) => {
        return { ...prev, image: files[0] };
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000} // Global auto close time for all toasts
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // Show newest toasts on top
        closeOnClick={true} // Close on click
        rtl={false} // Right-to-left (set to true if needed)
        pauseOnFocusLoss={false} // Pause when focus is lost
        draggable={false} // Make it non-draggable
      />
      <div className="w-full h-screen max-w-md mx-auto p-2">
        <h1 className="text-3xl text-white font-semibold mt-4 text-center">
          Create New Product
        </h1>
        <form
          className="w-full mt-5"
          onSubmit={(e) => handleSubmit(e)}
          encType="multipart/form-data"
        >
          <input
            className="w-full px-2 py-2 text-white rounded-md bg-transparent mb-4 border-2 border-white placeholder:text-white outline-none"
            type="text"
            autoComplete="off"
            value={data.name}
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
          />
          <input
            className="w-full px-2 py-2 text-white rounded-md bg-transparent mb-4 border-2 border-white placeholder:text-white outline-none"
            type="number"
            autoComplete="off"
            value={data.price}
            name="price"
            placeholder="Product Price"
            onChange={handleChange}
          />
          <label htmlFor="" className="text-white block mb-1">
            Image /*JPG, PNG, JPEG*/
          </label>
          <input
            className="w-full px-2 py-2 text-white rounded-md bg-transparent mb-4 border-2 border-white placeholder:text-white outline-none"
            type="file"
            name="image"
            onChange={handleFileChange} // Handles file selection
          />
          <button
            type="submit"
            className="w-full px-2 py-2 rounded-md bg-transparent mb-4 border-2 border-white text-white outline-none"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
