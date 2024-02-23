import "./App.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Products from "./Pages/Customer/Products/Products";
import Product from "./Pages/Customer/Products/Product";
import Cart from "./Pages/Customer/Cart/Cart";
import Dashboard from "./Pages/Admin/Dashboard";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
