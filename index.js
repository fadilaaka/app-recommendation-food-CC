const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("(TESTING CLOUD RUN) Halo Express!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port 5000`);
});
