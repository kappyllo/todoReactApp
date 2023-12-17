require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("./schemas/Tasks");

const uri = process.env.DATABASE_URL;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
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

app.get("/getTasks", async (req, res) => {
  try {
    // res.set({
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": true,
    // });
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("error??");
  }
});

// app.get("/createTaskLol", (req, res) => {
//   const testowyTaskMDb = new taskModel({
//     id: Math.random(),
//     name: "kodowanko",
//     isDone: true,
//   });

//   testowyTaskMDb.save();

//   res.send("dodano");
// });

app.put("/save", async (req, res) => {
  try {
    const resJS = res.body.json();
    const response = new taskModel({
      id: resJS.id,
      name: resJS.name,
      isDone: resJS.isDone,
    });
    response.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("error");
  }
});

app.listen(port, () => {
  console.log("Server started on port: 8080");
});
