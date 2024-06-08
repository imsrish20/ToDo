const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/taskModel");
const URI =
  "mongodb+srv://imsrish20:tEIA6x6wL1hnvNCQ@cluster0.r0q7yac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    let result = await Task.find({});
    res.status(200);
    res.send(result);
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
// Count Incomplete Tasks API
app.get("/tasks/incomplete/count", async (req, res) => {
  try {
    const count = await Task.countDocuments({ isCompleted: false });
    res.status(200).send({ count });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

//EditTask
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

mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongo DB connected");
    app.listen("3030", function () {
      console.log(`App is listening`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
