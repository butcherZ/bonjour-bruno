const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const job = require("./schedule");
const Resource = require("./models/resource");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connect to database"));

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/get", (req, res) => {
  // Get the count of all resources
  Resource.count().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count);

    // Again query all resources but only fetch one offset by random
    Resource.findOne()
      .skip(random)
      .exec(function (err, result) {
        res.send(result);
      });
  });
});

app.post("/post", (req, res) => {
  const data = req.body;
  Resource.findByIdAndUpdate(
    data._id,
    { isValid: false },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Resource : ", docs);
      }
    }
  );
});
job();
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
