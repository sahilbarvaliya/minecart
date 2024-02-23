import React from "react";
import Navbar from "../../Component/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const sales = localStorage.getItem("sales");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  // const data = JSON.parse(sales).filter((sale) => sale.id === user);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </div>

      <div className="container mx-auto">
      </div>
    </>
  );
}
