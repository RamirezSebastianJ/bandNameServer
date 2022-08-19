const { default: cli } = require("@angular/cli");
const { io } = require("../index.js");
const Bands = require("../models/bands.js");
const Band = require("../models/band.js");

const bands = new Bands();

bands.addBand(new Band("The Beatles"));
bands.addBand(new Band("The Rolling Stones"));
bands.addBand(new Band("The Who"));
bands.addBand(new Band("The Doors"));

//message Sockets
io.on("connection", (client) => {
  client.emit("active-bands", bands.getBands());
  client.on("event", () => {
    console.log("User connected");
  });

  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  client.on("message", (payload) => {
    console.log(payload);
    client.broadcast.emit("message", payload);
  });
  client.on("send-message", function (data) {
    console.log("Escuchando: ", data);
    client.broadcast.emit("send-message", data);
  });

  client.on("vote-band", (payload) => {
    console.log(payload);
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  //add band
  client.on("add-band", (payload) => {
    console.log(payload);
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });

  //delete band
  client.on("delete-band", (payload) => {
    console.log(payload);
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  }
  );
});
