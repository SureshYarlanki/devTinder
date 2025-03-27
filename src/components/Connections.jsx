import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "./utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections); // Redux state

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true, // Ensure cookies are sent
      });

      // Dispatch data to Redux
      dispatch(getConnections(res.data));
      console.log("API Response:", res.data);
    } catch (error) {
      console.error(
        "Error fetching connections:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  console.log("Redux State (Connections):", connections);

  return (
    <div className="p-4">
      <h1 className="text-xl text-center font-bold mb-4">Connections</h1>
      
        {connections?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mx-auto w-[40%]">
            {connections.data.map((connection) => {
              const {
                _id,
                firstName,
                lastName,
                age,
                gender,
                image,
                skills,
                about,
              } = connection;

              return (
                <div
                  key={_id}
                  className="border rounded-lg p-4 flex items-center gap-4 shadow-md"
                >
                  {/* Display user image */}
                  <div className="w-20 h-20">
                    <img
                      src={image || "https://via.placeholder.com/150"}
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Display user details */}
                  <div>
                    <h2 className="font-semibold text-lg">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-600">Age: {age}</p>
                    <p className="text-sm text-gray-600">Gender: {gender}</p>
                    <p className="text-sm text-gray-600">
                      Skills:{" "}
                      {skills?.length
                        ? skills.join(", ")
                        : "No skills available"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{about}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600">No connections found.</p>
        )}
      </div>
  
  );
};

export default Connections;
