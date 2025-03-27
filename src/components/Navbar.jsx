import React, { useRef, useState, useEffect } from "react";
import tinderLogo from "../assets/tinder-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "./utils/userSlice";
import UserAuth from "./UserAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const imgRef = useRef();
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const location = useLocation();
  const hiddenRoutes = ["/login", "/signUp"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  // Close dropdown menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && imgRef.current) {
        if (
          !menuRef.current.contains(e.target) &&
          !imgRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handle logout
  const handleLogoutButton = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );

      setIsOpen(false); // Close the dropdown menu
      dispatch(removeUser()); // Clear user data from Redux store
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex justify-between px-8 py-4 border-b bg-black text-white sticky top-0 z-10">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img className="w-12 h-12" src={tinderLogo} alt="tinderLogo" />
        <h1 className="text-4xl font-semibold">devTinder</h1>
      </Link>

      {/* Profile Section */}
      {user ? (
        <div className="relative flex items-center gap-2">
          <h1 className="flex items-center">Welcome, {user?.firstName}</h1>
          <img
            ref={imgRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            src={user?.image || "https://via.placeholder.com/150"}
            alt="User Profile"
            aria-label="User Profile"
          />

          {isOpen && (
            <div
              ref={menuRef}
              className="absolute bg-gray-700 text-white rounded-lg top-16 w-36 right-0 text-center shadow-lg"
              tabIndex={0}
              role="menu"
            >
              <ul>
                <li
                  role="menuitem"
                  className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  <Link to="/profile">Profile</Link>
                </li>
                <li
                  role="menuitem"
                  className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  <Link to="/connections">Connections</Link>
                </li>
                <li
                  role="menuitem"
                  className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  <Link to="/requests">Request</Link>
                </li>
                <li
                  role="menuitem"
                  className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  <Link to="/premium" className="">
                    Premium
                  </Link>
                </li>
                <li
                  onClick={handleLogoutButton}
                  role="menuitem"
                  className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className={`px-4 py-1 flex items-center text-black bg-white rounded-full transform transition-all duration-1000 hover:bg-gray-200 hover:text-white`}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
