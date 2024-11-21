import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center mx-[4%] md:mx-[10%] py-3">
      <Link to={"/"}>
        <h1 className="text-blue-700 text-[25px] sm:text-3xl font-bold leading-tight tracking-tighter">
          PRODUCT STORE <i className="fa-solid fa-cart-shopping"></i>
        </h1>
      </Link>
      <div className="flex gap-2">
        <Link to={"/create"}>
          <button className="bg-slate-800 text-white px-2.5 py-1 sm:px-3 text-[18px] sm:py-1.5 rounded-md font-bold">
            <i className="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
