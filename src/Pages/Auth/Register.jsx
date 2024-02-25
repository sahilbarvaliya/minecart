import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    role: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if (form.name === "") {
      setError({
        ...error,
        name: "Name is required",
      });
      return;
    }

    if (form.email === "") {
      setError({
        ...error,
        email: "Email is required",
      });
      return;
    }

    if (form.password === "") {
      setError({
        ...error,
        password: "Password is required",
      });
      return;
    }

    if (form.password !== form.repassword) {
      setError({
        ...error,
        repassword: "Password does not match",
      });
      return;
    }

    // add details in auth.json
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((ur) => ur.email === form.email)) {
      setError({
        ...error,
        email: "Email already exist",
      });
      return;
    }

    const user = {
      id: users.length + 1,
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    users.push(user);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("users", JSON.stringify(users));
    setForm({
      name: "",
      email: "",
      password: "",
      repassword: "",
      role: "",
    });

    if (form.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/products");
    }

    setError({
      name: "",
      email: "",
      password: "",
      repassword: "",
      role: "",
    });
  };

  return (
    <div className="mx-auto w-1/3 h-screen justify-center items-center	 flex">
      <div className="w-full h-1/2 ">
        <h1 className="text-3xl font-bold underline text-center mb-8">
          Register Here
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSumbit}>
          <input
            type="text"
            name="name"
            className="border-2 border-gray-300 p-2"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            className="border-2 border-gray-300 p-2"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <div className="flex  items-center ">
            <div className="mr-6">
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={handleChange}
                className="mr-2"
                id="admin"
                checked={form.role === "admin"}
              />
              <label htmlFor="admin">Admin</label>
            </div>

            <div>
              <input
                type="radio"
                name="role"
                value="user"
                onChange={handleChange}
                className="mr-2"
                id="user"
                checked={form.role === "user"}
              />
              <label htmlFor="user">User</label>
            </div>
          </div>
          <input
            type="password"
            name="password"
            className="border-2 border-gray-300 p-2"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="repassword"
            className="border-2 border-gray-300 p-2"
            placeholder="ReEnter your password"
            value={form.repassword}
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Register
          </button>

          {error.repassword ||
          error.name ||
          error.email ||
          error.password ||
          error.role ? (
            <p className="text-red-500 text-sm text-center">
              {error.repassword ||
                error.name ||
                error.email ||
                error.password ||
                error.role}
            </p>
          ) : null}

          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-blue-800 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
