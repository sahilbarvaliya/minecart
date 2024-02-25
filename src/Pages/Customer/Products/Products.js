import React, { useEffect, useState } from "react";
import Navbar from "../../../Component/Navbar";
import { Link } from "react-router-dom";

export default function Products() {
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearch = (e) => {
    setFilter(e.target.value);

    const filteredProducts =
      JSON.parse(localStorage.getItem("products")).filter((product) => {
        return (
          product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          product.category.toLowerCase().includes(e.target.value.toLowerCase())
        );
      }) || [];

    setProducts(filteredProducts);
    if (e.target.value === "") {
      setProducts(JSON.parse(localStorage.getItem("products")) || []);
    }
  };

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

  const handleSortClick = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    const newSortedData = [...products].sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      return newDirection === "asc" ? priceA - priceB : priceB - priceA;
    });
    setProducts(newSortedData);
    setSortDirection(newDirection);
  };

  const filterByCategory = (category) => {
    if (category === "") {
      setProducts(JSON.parse(localStorage.getItem("products")) || []);
      return;
    }
    const filteredProducts = JSON.parse(
      localStorage.getItem("products")
    ).filter((product) => {
      return product.category.toLowerCase() === category.toLowerCase();
    });
    setProducts(filteredProducts);
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
            <button
              onClick={handleSortClick}
              className="flex justify-center items-center ml-2"
            >
              Sort Price:
              {sortDirection === "asc" ? (
                <i class="icon-plus-circle text-blue-500 hover:text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </i>
              ) : (
                <i class="icon-plus-circle text-blue-500 hover:text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </i>
              )}
            </button>
          </div>
        </div>

        <div
          className="
          flex items-start justify-between
        "
        >
          {/* side navbar for category sort*/}
          <div className="flex justify-between flex-col mr-6 items-start ">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            <button onClick={() => filterByCategory("electronics")}>
              Electronics
            </button>

            <button onClick={() => filterByCategory("clothing")}>
              Clothing
            </button>

            <button onClick={() => filterByCategory("groceries")}>
              Groceries
            </button>

            <button onClick={() => filterByCategory("furniture")}>
              Furniture
            </button>

            <button onClick={() => filterByCategory("")}>Show All</button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-8 w-full">
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
      </div>
    </>
  );
}
