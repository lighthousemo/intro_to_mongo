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
// Require the mongo db client
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/tasks'; // tasks is the database name

// This variable will hold the mongo database connection object.
// This object is assigned later, in the Mongo connection callback.
var db;

// GET /tasks - display a list of all tasks
app.get("/tasks", (req, res) => {
  // TODO: Get tasks from the database
  db.collection('tasks').find({}).toArray(function(err, tasks) {
    if(err) {
      throw new Error("Could not connect to database");
    }

    // We want the tasks to show up on the tasks page.
    res.render("tasks", { tasks: tasks });
  });
});

// POST /tasks - Called when the user submits the form that
// adds a new task.
app.post("/tasks", (req, res) => {
  // TODO: Add a new task to the database
  const newTask = {description: req.body.description, done: false};

  // Send the new task object to the mongo database
  db.collection("tasks").insertOne(newTask, function(err, r) {
    if(err) {
      throw new Error("Could not insert task");
    }

    res.redirect("/tasks");
  });
});

MongoClient.connect(url, function(err, dbConnection) {
  if(err) {
    console.log("Could not connect to mongo server", err);
    return;
  }
  console.log("Connected successfully to the mongo server");

  db = dbConnection;

  app.listen(PORT, function() {
    console.log("Express server listening on port: " + PORT);
  });
});
