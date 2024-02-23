import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../Component/Navbar";

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();

  const handleCheckout = () => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const newSale = {
      id: sales.length + 1,
      products: cart,
      date: new Date().toLocaleDateString(),
    };
    sales.push(newSale);
    localStorage.setItem("sales", JSON.stringify(sales));
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center">Cart</h1>
        {cart.length === 0 ? (
          <>
            <h1 className="text-2xl font-bold text-center">Cart is empty</h1>
            <Link to="/products">
              <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
                Go to Products
              </button>
            </Link>
          </>
        ) : (
          <div>
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex justify-between  items-start border-2 p-4 rounded-md mt-4"
              >
                <div className="flex flex-col">
                  <h1>Name: {product.name}</h1>
                  <h1>Quntity: {product.qty}</h1>
                  <h1>Price: {product.price}</h1>
                  <h1>Total: {product.qty * product.price}</h1>
                </div>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-1/4 h-1/4 object-cover"
                />
              </div>
            ))}
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
              onClick={() => {
                handleCheckout();
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
