import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../context/productContext";
import { ToastContainer, toast } from "react-toastify";

const Modal = () => {
  const { showModel, setShowModel, editData, setEditProduct } =
    useContext(productContext);
  const [data, setData] = useState({
    name: editData?.name || "",
    price: editData?.price || "",
    image: editData?.image || "",
  });
  const [error, setError] = useState({});

  // Sync the `data` state with `editData` when `editData` changes
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name || "",
        price: editData.price || "",
        image: editData.image || "",
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form first
    const isValid = validateForm(data); // Validate the form data

    if (!isValid) {
      // If validation fails, don't proceed with the form submission
      return; // Exit early, no need to send data to the server
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image);

    await setEditProduct(formData);
    setData({
      name: "",
      price: "",
      image: "",
    });
    setShowModel(!true);
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
    if (files && files[0]) {
      setData((prev) => {
        return { ...prev, image: files[0] };
      });
    }
  };
  return (
    <>
      <div>
        {/* Modal for editing a product */}
        {showModel && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="font-bold text-[20px] mb-1">Edit Product</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Product Price</label>
                  <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                  />
                </div>
                {data.image.filename && !data.image.file && (
                  <div>
                    <p>Current image</p>
                    <img
                      className="object-cover w-[70px] h-[70px] m-auto my-1"
                      src={data.image.url} // Adjust to your image path
                      alt="Current product image"
                    />
                  </div>
                )}
                <div>
                  <label>Product Image</label>
                  <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button className="bg-green-600 rounded" type="submit">
                  Update Product
                </button>
                <button
                  className="bg-red-600 rounded ml-2.5"
                  type="button"
                  onClick={() => setShowModel(!true)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
