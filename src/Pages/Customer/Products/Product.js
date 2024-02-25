import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Component/Navbar";

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [qty, setQty] = useState(1);
  let { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  const handleCart = () => {
    console.log("Added to cart");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1
          className="text-4xl font-bold"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Product Details
        </h1>
        <img
          src={product.img}
          alt={product.name}
          className="w-1/2 h-1/2 mx-auto"
        />

        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.desc}</p>

        <div className="flex justify-start items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              if (qty > 1) {
                setQty(qty - 1);
              }
            }}
          >
            -
          </button>
          <p className="mx-4">{qty}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => {
              handleCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
