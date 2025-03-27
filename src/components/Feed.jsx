import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import { useEffect, useCallback } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed || []); // Default to an empty array

  const getFeed = useCallback(async () => {
    try {
      if (!feed.length) {
        const res = await axios.get("http://localhost:3000/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  }, [dispatch, feed]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  // Conditional rendering
  if (!feed.length) {
    return (
      <h1 className="text-center my-10 text-gray-700 text-3xl">
         No new users   
      </h1>
    );
  }

  return <UserCard user={feed[0]} />;
};

export default Feed;
