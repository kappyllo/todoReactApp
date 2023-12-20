require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("./schemas/Tasks");

const uri = process.env.DATABASE_URL;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
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

app.put("/save", async (req, res) => {
  try {
    // Pobierz dane do zaktualizowania z ciała zapytania
    const newData = req.body;

    // Usuń wszystkie istniejące dokumenty w kolekcji
    await taskModel.deleteMany({});

    // Wstaw nowe dane
    await taskModel.insertMany(newData);

    res.status(200).json({ message: "Baza danych została zaktualizowana." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji bazy danych:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas aktualizacji bazy danych." });
  }
});

app.listen(port, () => {
  console.log("Server started on port: 8080");
});
