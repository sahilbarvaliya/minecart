import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const logdinUser = localStorage.getItem("user");
  const user = JSON.parse(logdinUser);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white p-4 mx-auto flex justify-between items-center">
      <p className="text-2xl font-bold">MineCart</p>
      <div
        className="
        flex
        justify-between
        items-center
      "
      >
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
            )}

            <Link to="/products" className="mr-4">
              Products
            </Link>

            <p
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </p>
            <Link
              to="/cart"
              className="bg-blue-500 text-white p-2 rounded-md ml-4"
            >
              Cart
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
