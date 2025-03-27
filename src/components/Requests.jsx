import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, setRequests } from "./utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests); // Directly access the array
  const [loading, setLoading] = useState(false); // For fetchRequests
  const [processing, setProcessing] = useState(null); // For button actions

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        {
          withCredentials: true,
        }
      );

      dispatch(setRequests(res.data)); // Update Redux state
      console.log("Fetched requests:", res.data);
    } catch (error) {
      console.error(
        "Error fetching requests:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      setProcessing(_id); // Set current request as processing
      const res = await axios.post(
        `http://localhost:3000/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", res.data);
      dispatch(deleteRequest(_id)); // Remove from Redux state
    } catch (error) {
      console.error(
        "Error in reviewRequests:",
        error.response?.data || error.message
      );
    } finally {
      setProcessing(null); // Reset processing state
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []); // Run on component mount

  console.log("requests", requests);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center my-10">Requests</h1>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading requests...</p>
        ) : requests && requests.length > 0 ? (
          requests.map((request) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              image,
              skills,
              about,
            } = request.fromUserId;

            return (
              <div key={_id} className="border p-4 rounded-lg mb-4 shadow-md">
                <div className="flex items-center gap-4">
                  <img
                    src={image || "https://via.placeholder.com/150"}
                    alt={`${firstName} ${lastName}`}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-600">Age: {age || "N/A"}</p>
                    <p className="text-sm text-gray-600">
                      Gender: {gender || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Skills:{" "}
                      {skills ? skills.join(", ") : "No skills available"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      About: {about || "No information available"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    className={`px-4 py-2 text-white rounded-lg ${
                      processing === _id
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => reviewRequests("accepted", request._id)}
                    disabled={processing === _id}
                  >
                    {processing === _id ? "Processing..." : "Accepted"}
                  </button>
                  <button
                    className={`px-4 py-2 text-white rounded-lg ${
                      processing === _id
                        ? "bg-gray-400"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() => reviewRequests("rejected", request._id)}
                    disabled={processing === _id}
                  >
                    {processing === _id ? "Processing..." : "Rejected"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
