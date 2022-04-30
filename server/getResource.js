const axios = require("axios");

module.exports = async function getResource(start) {
  const keyword = "Bruno Le Maire";
  const URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${keyword}&searchType=image&fileType=png&imageSize=LARGE&gl=fr&imgType=face&dataRestrict=d[10]&start=${start}`;

  try {
    const response = await axios(URL);
    if (response) {
      const result = response.data.items;
      const resources = result.map((x) => ({ url: x.link, isValid: true }));
      return resources;
    }
  } catch (error) {
    console.log(error);
  }
};
