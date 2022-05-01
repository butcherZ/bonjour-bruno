const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const job = require("./schedule");
const schedule = require("node-schedule");
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
job();
app.get("/", (req, res) => {
  res.send("hello from server");
});

// TODO schedule api call
// var currentResource;

// schedule.scheduleJob({ second: 10 }, async () => {
//   console.log("++++ lauch schedule +++++");
//   Resource.aggregate([{ $sample: { size: 1 } }], (err, docs) => {
//     currentResource = docs[0];
//   });
//   console.log("---- at the end of schedule -----", currentResource);
// });

app.get("/get", async (req, res) => {
  //currentResource = await Resource.findById(process.env.ID);
  Resource.aggregate([{ $sample: { size: 1 } }], (err, docs) => {
    res.send(docs[0]);
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
  ).exec((err, result) => res.send(result));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
