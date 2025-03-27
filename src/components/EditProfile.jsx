import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "./utils/userSlice";

const allSkills = [
  "Traveling",
  "Cooking",
  "Hiking",
  "Fitness",
  "Photography",
  "Music",
  "Movies",
  "Dancing",
  "Reading",
  "Gaming",
  "Yoga",
  "Art",
  "Pet Lover",
  "Foodie",
  "Cycling",
  "Gardening",
  "Tech Enthusiast",
  "Fashion",
  "Adventure Sports",
  "Volunteer Work",
];

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [image, setImage] = useState(user.image || "");
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        age: Number(age),
        gender,
        skills,
        image,
      };
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        payload,
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="flex flex-col w-full md:flex-row justify-center gap-10 p-6 bg-white shadow-md rounded-lg">
      {/* Edit Profile Form */}
      <div className="flex flex-col w-[45%] p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Profile
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Skills
          </label>
          <div className="flex flex-wrap gap-2  border border-gray-300 p-2 rounded-lg">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            {!skills.length && (
              <span className="text-gray-500">Select your skills below</span>
            )}
          </div>
          <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto">
            {allSkills.map((skill, index) => (
              <li
                key={index}
                onClick={() => handleAddSkill(skill)}
                className={`p-2 cursor-pointer hover:bg-blue-400 ${
                  skills.includes(skill) ? "bg-blue-500" : ""
                }`}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter image URL"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={updateProfile}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Profile
        </button>
      </div>

      {/* Profile Preview */}
      <div className="rounded-lg  ">
        <UserCard className="w-[70%]" user={{ firstName, lastName, age, gender, image, skills }} />
      </div>
    </div>
  );
};

export default EditProfile;
