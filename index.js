const { default: cli } = require("@angular/cli");
const express = require("express");
const path = require("path");
require("dotenv").config();

//express App
const app = express();

//node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require ('./sockets/socket');


//public path
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Err(err);
  console.log(`Server is running on port ${process.env.PORT}!!!!`);
});
