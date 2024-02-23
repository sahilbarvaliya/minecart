import React, { useState } from "react";
import Navbar from "../../../Component/Navbar";
import { Link } from "react-router-dom";

const pro = [
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
];

export default function Products() {
  const [filter, setFilter] = useState("");
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
  const handleSearch = (e) => {
    setFilter(e.target.value);

    const filteredProducts = pro.filter((product) => {
      return (
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.category.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setProducts(filteredProducts);
    if (e.target.value === "") {
      setProducts(pro);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold  mb-8I">Products</h1>
          <div className="w-full flex justify-end">
            <input
              type="text"
              className="w-1/3 p-2 border-2 border-gray-300 rounded-md"
              placeholder="Search for products"
              value={filter}
              onChange={handleSearch}
            />
            <button className="bg-blue-500 text-white p-2 rounded-md ml-2">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          {products.map((product, index) => (
            <Link
              to={`/product/${product.id}`}
              key={index}
              className="bg-gray-200 p-4 rounded-md"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover border-2 rounded-md"
              />
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>
                Description:
                {product.desc.length > 10
                  ? product.desc.substring(0, 10) + "..."
                  : product.desc}
              </p>
            </Link>
          ))}

          {products.length === 0 && (
            <h1 className="text-2xl font-bold text-center col-span-4">
              No Products Found
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
