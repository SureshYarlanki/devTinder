import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
// import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed"
import { Provider } from "react-redux";
import appStore from "./components/utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import UserAuth from "./components/UserAuth";

const App = () => {
  return (
    <div className="  text-white bg-black">
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<Login />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/login" element={<UserAuth/>}/>
              <Route path="/signUp" element={<UserAuth/>}/>
              {/* <Route path="/premium" element={<UserAuth/>}/> */}
              
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
