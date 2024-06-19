const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/taskModel");
require('dotenv').config();  // Ensure this is at the top

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hii, the application is running!");
});

// Create API
app.post("/tasks", async (req, res) => {
  try {
    let title = req.body.title;
    let isCompleted = false;
    let result = await Task.create({ title: title, isCompleted: isCompleted });
    res.status(200);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

// Read API
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    const count = await Task.countDocuments({ isCompleted: false });
    res.status(200);
    res.json({tasks: tasks, itemCount: count});
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something went wrong!");
  }
});

// Update API
app.get("/tasks/revertCompletion/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let record = await Task.findOne({ _id: id });
    console.log(record);
    let update = { isCompleted: !record.isCompleted };
    let result = await Task.updateOne({ _id: id }, update);
    res.status(200);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something firse went wrong!");
  }
});

// Edit Task
app.put("/tasks/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = { title: req.body.title };
    const result = await Task.findOneAndUpdate(filter, update);
    res.status(200);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something firse went wrong!");
  }
});

// Delete API
app.delete("/tasks/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await Task.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send("Something firse went wrong!");
  }
});

const URI = process.env.MONGODB_URI;
console.log('MongoDB URI:', URI); // Added for debugging
const PORT = process.env.PORT || 3030;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Add options to avoid warnings
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, function () {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
