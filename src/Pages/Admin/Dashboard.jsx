import React, { useState } from "react";
import Navbar from "../../Component/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [categorySales, setCategorySales] = useState({});
  const [error, setError] = useState("");
  const [products, setProducts] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
    img: "",
  });

  if (!user) {
    navigate("/login");
  }

  // const data = JSON.parse(sales).filter((sale) => sale.id === user);

  const handleSumbit = (e) => {
    e.preventDefault();

    if (
      products.name === "" ||
      products.price === "" ||
      products.category === "" ||
      products.desc === "" ||
      products.img === ""
    ) {
      return setError("All fields are required");
    }

    const data = JSON.parse(localStorage.getItem("products")) || [];
    const id = data.length + 1;

    const product = {
      id,
      vendorId: user.id,
      ...products,
    };

    data.push(product);

    localStorage.setItem("products", JSON.stringify(data));

    setProducts({
      name: "",
      price: "",
      category: "",
      desc: "",
      img: "",
    });
    setError("");
  };

  const handleChange = (e) => {
    if (e.target.name === "category") {
      if (e.target.value === "electronics") {
        setProducts({
          ...products,
          [e.target.name]: e.target.value,
          img: "https://source.unsplash.com/1600x900/?electronics",
        });
      }
      if (e.target.value === "clothing") {
        setProducts({
          ...products,
          [e.target.name]: e.target.value,
          img: "https://source.unsplash.com/1600x900/?clothing",
        });
      }
      if (e.target.value === "groceries") {
        setProducts({
          ...products,
          [e.target.name]: e.target.value,
          img: "https://source.unsplash.com/1600x900/?groceries",
        });
      }
      if (e.target.value === "furniture") {
        setProducts({
          ...products,
          [e.target.name]: e.target.value,
          img: "https://source.unsplash.com/1600x900/?furniture",
        });
      }
    } else {
      setProducts({
        ...products,
        [e.target.name]: e.target.value,
      });
    }
  };

  React.useEffect(() => {
    const salesByCategory = sales
      .map((dt) => dt.products.filter((dt) => dt.vendorId === user.id))
      .filter((dt) => dt.length > 0)
      .reduce((acc, currentProducts) => {
        currentProducts.forEach((product) => {
          acc[product.category] = acc[product.category] || 0;
          acc[product.category] += Number(product.price) * product.qty;
        });
        return acc;
      }, {});
    setCategorySales(salesByCategory); // Update state with calculated sales
  }, []);

  console.log(categorySales);
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>
      </div>

      <div className="container mx-auto">
        <div className="border border-gray-300 p-4 rounded-md ">
          <h1 className="text-3xl font-bold text-center mb-4">View Sales</h1>

          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-left">Price</th>
                <th className="text-left">Category</th>
                <th className="text-left">No of sales</th>
              </tr>
            </thead>
            <tbody>
              {sales
                .map((dt) =>
                  dt.products.filter((dt) => dt.vendorId === user.id)
                )
                .filter((dt) => dt.length > 0)
                .map((sale) =>
                  sale.map((dt, index) => (
                    <tr key={index}>
                      <td>{dt.name}</td>
                      <td>{dt.price}</td>
                      <td>{dt.category}</td>
                      <td>{dt.qty}</td>
                    </tr>
                  ))
                )}

              {sales
                .map((dt) =>
                  dt.products.filter((dt) => dt.vendorId === user.id)
                )
                .filter((dt) => dt.length > 0).length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No sales yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* total sales by category */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Total Sales By Category</h1>
            {categorySales &&
              Object.keys(categorySales).map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <h1>{category}</h1>
                  <h1>${categorySales[category]}</h1>
                </div>
              ))}

            <div className="flex justify-between items-center mt-4">
              <h1>Total Sales</h1>
              <h1>
                $
                {Object.keys(categorySales).length > 0 &&
                  Object.values(categorySales).reduce(
                    (acc, current) => acc + current
                  )}
              </h1>
            </div>

            {Object.keys(categorySales).length === 0 && (
              <p className="text-center">No sales yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-4">Add Product</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSumbit}>
          <input
            type="text"
            name="name"
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter product name"
            onChange={handleChange}
            value={products.name}
          />
          <select
            name="category"
            className="border-2 border-gray-300 p-2 bg-white rounded-md"
            onChange={handleChange}
            value={products.category}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="groceries">Groceries</option>
            <option value="furniture">Furniture</option>
          </select>
          <input
            type="number"
            name="price"
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter product price"
            onChange={handleChange}
            value={products.price}
            min={1}
          />
          <input
            type="text"
            name="desc"
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter product description"
            onChange={handleChange}
            value={products.desc}
          />
          <input
            type="text"
            name="img"
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter product image url"
            onChange={handleChange}
            value={products.img}
          />
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Add Product
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </>
  );
}
