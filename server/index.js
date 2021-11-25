const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = 3000;

io.on("connection", socket => {
  console.log("a user connected :D");

  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });

});

http.listen(port, () => console.log("server running on port:" + port));