/*
 * Todo-list app to illustrate how to store data in databases.
 * This todo-list application stores tasks in a mongo db database.
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;

// use ejs as the templating language
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded form data into req.body
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Connect to a mongo db database

// GET /tasks - display a list of all tasks
app.get("/tasks", (req, res) => {
  // TODO: Get tasks from the database

  // We want the tasks to show up on the tasks page.
  res.render("tasks", { tasks: [] });
});

// POST /tasks - Called when the user submits the form that
// adds a new task.
app.post("/tasks", (req, res) => {
  // TODO: Add a new task to the database

  res.redirect("/tasks");
});


app.listen(PORT);
