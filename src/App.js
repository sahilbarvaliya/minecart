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
          <Route
            path="*"
            element={
              <div className="flex w-full h-screen justify-center items-center">
                <div>
                  <h1 className="text-4xl font-bold text-center mb-4">
                    Welcome to Minecart
                  </h1>
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Go to Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline mx-4"
                  >
                    Go to Register
                  </Link>
                  <Link
                    to="/products"
                    className="text-blue-500 hover:underline"
                  >
                    Go to Products
                  </Link>
                  <Link to="/cart" className="text-blue-500 hover:underline mx-4">
                    Go to Cart
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-blue-500 hover:underline"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
