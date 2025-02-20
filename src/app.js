const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./modules/user");
app.use(express.json()) //middleWare

app.post("/singUp", async (req, res) => {
<<<<<<< HEAD
  const user = new User(req.body);
=======
  //creating a new intense of the user model
  const user = new User({
    firstName: "chandru",
    lastName: "mariyapan",
    email: "chandru@gmail.com",
    password: "chandru@123",
  });
>>>>>>> 2ba49b5ee62b2d4952db23fc5a977a50c4b5aa3c
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
