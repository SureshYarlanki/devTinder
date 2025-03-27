import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState(""); // Added state for mobile
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   const endpoint = isLoginForm
  //     ? "http://localhost:3000/login"
  //     : "http://localhost:3000/signUp";

  //   const requestData = isLoginForm
  //     ? { email, password }
  //     : { firstName, userName, email, password, mobile };

  //   try {
  //     const res = await axios.post(endpoint, requestData, {
  //       withCredentials: true,
  //     });
  //     dispatch(addUser(res.data.message));
  //     setError("");
  //     navigate(isLoginForm ? "/signUp" : "/login");
  //   } catch (err) {
  //     if (err.response && err.response.data && err.response.data.message) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };
// const handleFormSubmit = async (event) => {
//   event.preventDefault();

//   // Validate form inputs
//   // if (
//   //   !email ||
//   //   !password ||
//   //   (!isLoginForm && (!firstName  || !mobile))
//   // ) {
//   //   setError("Please fill in all required fields."); // Set error if fields are empty
//   //   return;
//   // }

//   const endpoint = isLoginForm
//     ? "http://localhost:3000/login"
//     : "http://localhost:3000/signup";

//   const requestData = isLoginForm
//     ? { email, password }
//     : { firstName, lastName, email, password, mobile };

//   console.log("Endpoint:", endpoint);
//   console.log("Request Data:", requestData);

//   try {
//     const res = await axios.post(endpoint, requestData, {
//       withCredentials: true,
//     });
//     console.log("Response Data:", res.data); // Debug response
//     dispatch(addUser(res.data.message)); // Dispatch user data to Redux store
//     setError(""); // Clear any errors
//     navigate(isLoginForm ? "/" : "/login"); // Correct navigation logic
//   } catch (err) {
//     console.error("Error Response:", err.response);
//     if (err.response && err.response.data && err.response.data.message) {
//       setError(err.response.data.message); // Show backend error message
//     } else {
//       setError("An unexpected error occurred. Please try again."); // Default error
//     }
//   }
// };

 const location = useLocation(); // Get the current URL path
 

 const handleSubmit = async (e) => {
   e.preventDefault();
   const endpoint = isLoginForm
     ? "http://localhost:3000/login"
     : "http://localhost:3000/signUp";

   const requestData = isLoginForm
     ? { email, password }
     : { firstName, lastName, email, password, mobile };

   try {
     const response = await axios.post(endpoint, requestData, {
       withCredentials: true,
     });
     console.log("Response:", response.data);
     dispatch(addUser(response.data)); // Save user data to Redux
     alert(isLoginForm ? "Login successful!" : "Signup successful!");
     navigate("/"); // Redirect to a dashboard or home page after success
   } catch (error) {
     console.error("Error:", error.response?.data?.message || error.message);
     alert(error.response?.data?.message || "Something went wrong!");
   }
 };

 // Update the form type based on URL whenever it changes
 useEffect(() => {
   console.log("Current path:", location.pathname);
   setIsLoginForm(location.pathname === "/login");
 }, [location.pathname]);



  return (
    <div className="w-[25%] grid place-content-center mx-auto">
      <div className="grid place-items-center border-[.1px] my-5 mx-auto px-7">
        <div className="mx-auto text-center my-7">
          <h1 className="mb-3 text-2xl">devtinder</h1>
          <p className=" tracking-tighter leading-tight">
            Sign up to match, chat, and connect with amazing people around you.
          </p>
          <div className="flex items-center justify-center mt-2">
            <div className="w-full h-[.1px] bg-gray-300"></div>
            <span className="mx-4 text-gray-500 font-medium ">OR</span>
            <div className="w-full h-[.1px] bg-gray-300"></div>
          </div>
        </div>
        <form
          className="w-full max-w-md  shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          {isLoginForm ? (
            <>
              <div className="relative mb-2">
                <input
                  type="email"
                  id="email"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer "
                  required
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mb-2">
                <input
                  type="password"
                  id="password"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  id="mobile"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="mobile"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Mobile Number
                </label>
              </div>

              <div className="relative mb-2">
                <input
                  type="password"
                  id="password"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password
                </label>
              </div>

              <div className="relative mb-2">
                <input
                  type="text"
                  id="name"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Full Name
                </label>
              </div>

              <div className="relative mb-2">
                <input
                  type="text"
                  id="username"
                  className="block rounded-sm px-2.5 pb-1.5 pt-4 w-full text-sm border appearance-none dark:text-white focus:outline-none   focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Username
                </label>
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
          <br />
          <Link
            to={isLoginForm ? "/signUp" : "/login"}
            type="button"
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="text-blue-600 underline"
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

 