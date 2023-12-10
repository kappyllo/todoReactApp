const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  isDone: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
