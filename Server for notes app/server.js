const express = require("express");
const { Db } = require("mongodb");
const mongoose = require("mongoose");
var app = express();
var Data = require("./noteSchema");

mongoose.connect("mongodb://localhost/newDB");

mongoose.connection
  .once("open", () => {
    console.log("connected to DB! ");
  })
  .on("error", (error) => {
    console.log("faild to connect " + console.log(error));
  });

//CREATE A NOTE(POST REQ)
app.post("/create", (req, res) => {
  var note = new Data({
    title: req.get("title"),
    date: req.get("date"),
    note: req.get("note"),
  });

  note.save().then(() => {
    if (note.isNew == false) {
      console.log("Saved Data! ");
      res.send("Saved Data! ");
    } else {
      console.log("Faild to Save data ");
    }
  });
});
//url http://192.168.43.220:8081/create
// ipv4 - 192.168.43.220
var server = app.listen(8081, "192.168.43.220", () => {
  console.log("server is runnng! ");
});

//DELETE A NOTE(POST REQ)
app.post("/delete", (req, res) => {
  Data.findOneAndRemove(
    {
      _id: req.get("id"),
    },
    (err) => {
      console.log("Failed " + err);
    }
  );
  res.send("Deleted!");
});

//UPDATE A NOTE(POST REQ)

app.post("/update", (req, res) => {
  Data.findOneAndUpdate(
    {
      _id: req.get("id"),
    },
    {
      note: req.get("note"),
      title: req.get("title"),
      date: req.get("date"),
    },
    (err) => {
      console.log("Failed to update " + err);
    }
  );
  res.send("Updated! ");
});

//FETCH ALL NOTE(GET REQ)
////url : http://192.168.43.220:8081/fetch

app.get("/fetch", (req, res) => {
  Data.find({}).then((DBitems) => {
    res.send(DBitems);
  });
});
