import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    setRequests: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload; // Replace state with the array
      } else if (action.payload?.data) {
        return action.payload.data; // Extract array if wrapped in "data"
      }
      return []; // Fallback to an empty array
    },
    deleteRequest: (state, action) => {
      return state.filter((r) => r._id !== action.payload); // Filter requests by ID
    },
  },
});

export const { setRequests, deleteRequest } = requestSlice.actions;
export default requestSlice.reducer;
