import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Component/Navbar";

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      category: "Electronics",
      desc: "This is a product 1",
      img: "https://source.unsplash.com/1600x900/?electronics",
    },
    {
      id: 2,
      name: "Product 2",
      price: 100,
      category: "Clothing",
      desc: "This is a product 2",
      img: "https://source.unsplash.com/1600x900/?clothing",
    },
    {
      id: 3,
      name: "Product 3",
      price: 100,
      category: "Food",
      img: "https://source.unsplash.com/1600x900/?food",
      desc: "This is a product 3",
    },
    {
      id: 4,
      name: "Product 4",
      price: 100,
      category: "Entertainment",
      desc: "This is a product 4",
      img: "https://source.unsplash.com/1600x900/?entertainment",
    },
    {
      id: 5,
      name: "Product 5",
      price: 100,
      category: "Electronics",
      desc: "This is a product 5",
      img: "https://source.unsplash.com/1600x900/?electronics",
    },
    {
      id: 6,
      name: "Product 6",
      price: 100,
      category: "Clothing",
      desc: "This is a product 6",
      img: "https://source.unsplash.com/1600x900/?clothing",
    },
    {
      id: 7,
      name: "Product 7",
      price: 100,
      category: "Food",
      desc: "This is a product 7",
      img: "https://source.unsplash.com/1600x900/?food",
    },
    {
      id: 8,
      name: "Product 8",
      price: 100,
      category: "Entertainment",
      desc: "This is a product 8",
      img: "https://source.unsplash.com/1600x900/?entertainment",
    },
  ]);
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
