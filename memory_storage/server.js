const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;

// use ejs as the templating language
app.set("view engine", "ejs");

// The in-memory array of task objects.
var tasks = []

// parse application/x-www-form-urlencoded form data into req.body
app.use(bodyParser.urlencoded({ extended: false }));

// GET /tasks - display a list of all tasks
app.get("/tasks", (req, res) => {
  // Read the tasks from the in-memory list of tasks
  // We want the tasks to show up on the tasks page.
  res.render("tasks", { tasks: tasks });
});

// POST /tasks - Called when the user submits the form that
// adds a new task.
app.post("/tasks", (req, res) => {
  // Add the task to the in-memory list of tasks
  const newTask = {description: req.body.description, done: false};
  tasks.push(newTask);
  res.redirect("/tasks");
});

app.listen(PORT);

