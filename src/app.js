const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./modules/user");

app.post("/singUp", async (req, res) => {
  const user = new User({
    firstName: "chandru",
    lastName: "mariyapan",
    email: "chandru@gmail.com",
    password: "chandru@123",
  });
  await user.save();
  res.send("user added successfully");
});

connectDB()
  .then(() => {
    console.log("connected database Successfully");
    app.listen(3000, () => {
      console.log("server is successfully listening on port number 3000...");
    });
  })
  .catch((error) => {
    console.error("database cannot be connected");
  });
