import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(
    location.pathname === "/login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  // const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginForm
      ? "http://localhost:3000/login"
      : "http://localhost:3000/signUp";

    const requestData = isLoginForm
      ? { email, password }
      : { firstName, userName, email, password };

    try {
      const response = await axios.post(endpoint, requestData, {
        withCredentials: true,
      });
      console.log("Response:", response.data);
      dispatch(addUser(response.data)); // Save user data to Redux
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    setIsLoginForm(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <div className="w-full p-4 md:p-0 md:w-[30%] grid place-content-center mx-auto">
      <div className="grid place-items-center border-[.1px] my-5 mx-auto px-7">
        <div className="mx-auto text-center my-7">
          <h1 className="mb-3 text-2xl">devtinder</h1>
          <p className="tracking-tighter leading-tight">
            Sign up to match, chat, and connect with amazing people around you.
          </p>
          <div className="flex items-center justify-center mt-2">
            <div className="w-full h-[.1px] bg-gray-300"></div>
            <span className="mx-4 text-gray-500 font-medium">OR</span>
            <div className="w-full h-[.1px] bg-gray-300"></div>
          </div>
        </div>
        <form
          className="w-full max-w-md shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          {isLoginForm ? (
            <>
              <div className="relative mb-2">
                <input
                  type="email"
                  id="email"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none focus:border-blue-600 peer"
                  required
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mb-2">
                <input
                  type="password"
                  id="password"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Password
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="relative mb-2">
                <input
                  type="email"
                  id="email"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mb-2">
                <input
                  type="password"
                  id="password"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Password
                </label>
                <div className="relative mb-2">
                  <input
                    type="text"
                    id="firstName"
                    className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    id="userName"
                    className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label
                    htmlFor="userName"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Username
                  </label>
                </div>
              </div>
            </>
          )}
          <p className="text-sm tracking-tighter text-center leading-tight">
            People who use our service may have shared your contact information
            with Tinder
          </p>
          <p className="text-sm tracking-tighter text-center leading-tight my-3">
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>
          {error && (
            <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 mb-14"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="border-[.1px] p-5">
        <p className="mt-4 text-sm text-center">
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={isLoginForm ? "/signUp" : "/login"}
            className="text-blue-600 underline font-medium"
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserAuth;
