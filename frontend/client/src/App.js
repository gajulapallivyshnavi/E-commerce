import "./App.css";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Route, Routes, Link } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AddProduct from "./pages/Addproduct";
import PrivateRoute from "./components/privateRoute";

function App() {
  const navigate = useNavigate();
  const { userstate, handleLogin, handleLogout } = useContext(AuthContext);
  return (
    <div className="App">
      <h1>Oly</h1>
      <ul id="top-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!userstate.isLoggedIn ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
              <button onClick={handleLogin}>Login</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {userstate.user.role == "seller" && (
              <li>
                <Link to="/add-product">Add Product</Link>
              </li>
            )}
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                logout
              </button>
            </li>
          </>
        )}
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute userstate={userstate}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute userstate={userstate}>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute permittedRoles={"seller"} userstate={userstate}>
              <AddProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
