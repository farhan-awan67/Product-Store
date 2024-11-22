import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../context/productContext";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { products, setShowModel, setEditData, deleteProduct } =
    useContext(productContext);
  //sending id to delete
  const handleDelete = (pId) => {
    if (!pId) {
      console.log("Product Id is invalid");
      return;
    }
    deleteProduct(pId); // Directly call deleteProduct with the ID
  };

  //sending product to edit
  const handleEdit = (product) => {
    setShowModel((prev) => !prev); // Toggle the modal visibility
    setEditData(product);
  };
  return (
    <>
      {products.length === 0 ? (
        <div className="flex justify-center items-center gap-1">
          <p className="text-white">No products available</p>{" "}
          <Link to={"/create"} className="text-blue-700">
            add product
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center md:justify-evenly flex-wrap gap-6  p-8 text-white md:mx-[9%]">
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="card w-full  sm:w-[255px] text-white shadow-xl  rounded-lg overflow-hidden text-center bg-zinc-900 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={product.image.url}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="p-2">
                  <h3 className="text-lg font-semibold mt-2">
                    {product.name.toUpperCase()}
                  </h3>
                  <p className=" text-md">$ {product.price.toFixed(2)}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="bg-transparent px-2 py-2 border-2 border-white rounded-[50%] transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] hover:border-zinc-400"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="bg-transparent px-2 py-2 border-2 border-white rounded-[50%] transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] hover:border-zinc-400"
                      onClick={() => handleEdit(product)}
                    >
                      <FiEdit />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Product;
