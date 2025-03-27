import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState: null, // Initial state (e.g., no user logged in)
  reducers: {
    addUser: (state, action) => action.payload, // Set user data
    removeUser: (state) => null, // Clear user data
  },
});

// Export actions for dispatch
export const { addUser, removeUser } = userSlice.actions;

// Export the reducer for the Redux store
export default userSlice.reducer;
