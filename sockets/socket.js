const { io } = require("../index.js");
//message Sockets
io.on("connection", (client) => {
  client.on("connect", () => {
    console.log("User connected");
  }),
    client.on("disconnect", () => {
      console.log("user disconnected");
    });

  client.on("message", (payload) => {
    console.log(payload);
    io.emit("message", payload);
  });
});
