import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.user)
  const fetchData = async () => {
    if(userData) return;
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user)); // Correctly accessing `user`
    } catch (error) {
      if(error.status === 401) {
        navigate("/login")
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
