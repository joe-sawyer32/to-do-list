const express = require("express");
const app = express();
const port = process.env.port || 3000;
const path = require("path");

const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

var toDos = [];
var toDones = [];
var itemCount = 0;

// SET ENGINE
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "/views"));

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTES
app.get("/", (request, response) => {
  response.render("index", { todoList: toDos, todoneList: toDones });
});

app.post("/todolist", (request, response) => {
  request.body.id = itemCount++;
  toDos.push(request.body);
  response.redirect("/");
});

app.post("/todonelist", (request, response) => {
  toDos.forEach((item, index) => {
    if (item.id == request.body.id) {
      toDones.push({ toDoneItem: item.toDoItem });
      toDos.splice(index, 1);
    }
  });
  response.redirect("/");
});

app.listen(port, () => {
  console.log("Spinning with express: Port", port);
});
