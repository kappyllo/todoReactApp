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
app.use(express.json());
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
    const newData = {
      id: await req.body.id,
      name: await req.body.name,
      isDone: await req.body.isDone,
    };

    taskModel.find({}, (err, documents) => {
      // tu ogarnac cos
      if (err) {
        console.error("Błąd podczas wyszukiwania dokumentów:", err);
      } else {
        documents.forEach((document) => {
          // Zastosuj aktualizację dla każdego dokumentu
          document.set(newData);
          document.save((err, updatedDocument) => {
            if (err) {
              console.error(
                "Błąd podczas zapisywania zaktualizowanego dokumentu:",
                err
              );
            } else {
              console.log(
                "Dokument zaktualizowany pomyślnie:",
                updatedDocument
              );
            }
          });
        });
      }
    });

    response.save();
    res.send("Tasks updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("error");
  }
});

app.listen(port, () => {
  console.log("Server started on port: 8080");
});
