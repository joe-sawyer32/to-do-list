const express = require("express");
const app = express();
const port = process.env.port || 8000;
const path = require("path");

app.use("/", express.static(path.join(__dirname, "/public")));

app.post("/to-do-list", (request, response) => {
  response.send("Post successful!");
});

app.listen(port, () => {
  console.log("Spinning with express: Port", port);
});
