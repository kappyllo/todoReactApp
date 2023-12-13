const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: Number,
  name: String,
  isDone: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
