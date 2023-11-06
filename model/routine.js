const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema({
  name: String,
  reps: Number,
  date: String,
  isDone: Boolean,
});

module.exports = routineSchema;
