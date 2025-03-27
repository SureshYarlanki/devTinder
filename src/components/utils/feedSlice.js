import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  feed: [], // Default to an empty array
};
const feedSlice = createSlice({
  name: "feed",
  initialState, // Initial state is null
  reducers: {
    addFeed: (state, action) => action.payload, // Fixed "payload" typo
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
