import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, skills, image } = user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});

  const handleSendRequest = async (status, userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const res = await axios.post(
        `http://localhost:3000/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      console.log(`Request ${status} successfully for user ID: ${userId}`);
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || e.message || "Something went wrong.";
      console.error("Error sending request:", errorMessage);
      alert(errorMessage);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const name =
    firstName && lastName ? `${firstName} ${lastName}` : "Unknown User";
  const ageAndGender =
    age && gender
      ? `Age: ${age}, Gender: ${gender}`
      : "Age and gender not provided";
  const skill = skills?.length ? skills.join(", ") : "No skills available.";

  return (
    <div className="flex flex-col items-center justify-between border p-6 rounded-lg shadow-lg w-full sm:w-auto mx-auto my-4 transition-transform transform hover:scale-105">
      <div className="w-full flex flex-col items-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full max-w-xs h-52 object-cover rounded-lg"
          />
        ) : (
          <div className="w-52 h-52 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="mt-4 text-center">
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-600">{ageAndGender}</p>
          <p className="text-sm text-gray-600">Skills: {skill}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="px-4 py-2 text-white rounded-lg bg-green-500 hover:bg-green-600 transition"
          disabled={loading[_id]}
        >
          {loading[_id] ? "Processing..." : "Accept"}
        </button>
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition"
          disabled={loading[_id]}
        >
          {loading[_id] ? "Processing..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
