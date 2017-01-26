/*
 * Todo-list app to illustrate how to store data in files.
 * This todo-list application stores tasks in the tasks.json file.
 * The data is encoded in the JSON format, but we could use CSV or XML
 * or other data formats.
 *
 * Note: There is a faster way to read json files using require, because Node
 * can parse JSON automatically.
 * The point of this more verbose code is to help you understand how files and
 * file encoding works.
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;

// Require the built-in node package that allows us to
// work with files.
// Docs: https://nodejs.org/api/fs.html
const fs = require("fs");

// Read the entire tasks.json file and return it as a string
const tasksFile = fs.readFileSync("tasks.json");
// Parse the JSON string into an array of objects
const tasks = JSON.parse(tasksFile).tasks || [];

// use ejs as the templating language
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded form data into req.body
app.use(bodyParser.urlencoded({ extended: false }));

// GET /tasks - display a list of all tasks
app.get("/tasks", (req, res) => {
  // TODO: Refactor the code that reads the tasks into a separate function

  // We want the tasks to show up on the tasks page.
  res.render("tasks", { tasks: tasks });
});

// POST /tasks - Called when the user submits the form that
// adds a new task.
app.post("/tasks", (req, res) => {
  // Add the task to the tasks.json file
  const newTask = {description: req.body.description, done: false};

  // TODO: Refactor the code that reads the tasks into a separate function
  //
  // Add the new task to the list of tasks
  tasks.push(newTask);
  // Create a JSON encoded string that will be written to the tasks file
  const newTasksFile = JSON.stringify({tasks: tasks});
  // Overwrite tasks.json to contain all the new tasks.
  fs.writeFileSync("tasks.json", newTasksFile);

  res.redirect("/tasks");
});


app.listen(PORT);
