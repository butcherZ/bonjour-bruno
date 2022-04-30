const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const job = require("./schedule");

require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const keyword = "Bruno Le Maire";
const start = 23;
const URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${keyword}&searchType=image&fileType=png&imageSize=LARGE&gl=fr&imgType=face&dataRestrict=d[10]&start=${start}`;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connect to database"));

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

job();
//getResource(12);
// axios
//   .get(URL)
//   .then((response) => {
//     const result = response.data.items;
//     const links = result.map((x) => x.link);
//     console.log("------", links);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
