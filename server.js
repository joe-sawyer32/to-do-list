const express = require("express");
const app = express();
const port = process.env.port || 3000;
const path = require("path");

const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", (request, response) => {
  response.render("index");
});

app.post("/", (request, response) => {
  let todoItem = request.body;
  console.log(todoItem);
  response.render("index", { todo: todoItem });
});

app.listen(port, () => {
  console.log("Spinning with express: Port", port);
});
