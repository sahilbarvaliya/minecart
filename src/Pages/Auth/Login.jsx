import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    const data = localStorage.getItem("users") || [];
    const users = JSON.parse(data);
    const user = users.find(
      (user) => user.email === form.email && user.password === form.password
    );

    if (user) {
      if (user.password === form.password) {
        if (user.rolw === "admin") {
          navigate("/admin");
        } else {
          navigate("/products");
        }
      }
    }

    localStorage.setItem("user", JSON.stringify(user));

    setForm({
      email: "",
      password: "",
    });

    setError("Invalid email or password");
  };

  return (
    <div className="mx-auto w-1/3 h-screen justify-center items-center	 flex">
      <div className="w-full h-1/2 ">
        <h1 className="text-3xl font-bold underline text-center mb-8">
          Login Here
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSumbit}>
          <input
            type="text"
            name="email"
            className="border-2 border-gray-300 p-2"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="border-2 border-gray-300 p-2"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Login
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
