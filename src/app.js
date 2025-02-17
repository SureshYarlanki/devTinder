const express = require("express");

const app = express();

// req (request) should be the first parameter.
// res (response) should be the second parameter.
// The app.use() method is handling all requests with a response.

// app.get() ensures that only GET requests for exact paths (/, /test, /home) are handled.
// app.use() is better suited for middleware (e.g., logging, authentication, static files).

app.use("/", (req, res) => {
  res.send("hello server from the vs Code");
});

app.use("/test", (req, res) => {
    res.send("hello test");
})
app.use("/home", (req, res) => {
    res.send("hello home");
})


// The app.listen(3000, ...) method starts the server and listens for incoming connections on port 3000.


app.listen(3000, () => {
  console.log("start the server at specified port number 3000...");
});
