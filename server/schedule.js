const schedule = require("node-schedule");
const getResource = require("./getResource");
const randomInteger = require("./utils/randomInt");

const Resource = require("./models/resource");

// call API and save returned data every sunday at 10AM
const job = () =>
  schedule.scheduleJob({ hour: 10, day: 0 }, async () => {
    console.log("----- running job ------");
    const resources = await getResource(randomInteger(1, 30));
    try {
      await Resource.insertMany(resources);
      console.log("data has been saved to collection");
    } catch (error) {
      console.error(error);
    }
  });

module.exports = job;
