require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("./schemas/Tasks");

const uri = process.env.DATABASE_URL;

const app = express();
const port = 8080;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.get("/", (req, res) => {
  res.send("TasksDb");
});

// app.get("/createTaskLol", (req, res) => {
//   // res.send("users dziala");
//   const testowyTaskMDb = new taskModel({
//     name: "polak",
//     isDone: true,
//   });

//   testowyTaskMDb.save();

//   res.send("dodano");
// });

app.get("/getTasks", async (req, res) => {
  try {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    });
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("error??");
  }
});

app.listen(port, () => {
  console.log("Server started on port: 8080");
});
