const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

// model import
const routineSchema = require("./model/routine");

const exercise = mongoose.model("Exercise", routineSchema);

const app = express();

const port = 4000;

// Must insert password for connection to work
const MongoDBAccess =
  "mongodb+srv://urbanengr:Leaf$23Star@cluster0.qmrzt1v.mongodb.net/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(MongoDBAccess)
  .then(() => {
    console.log("my MongoDB has connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`we are listening to port ${port}`);
});

app.get("/", (_req, res) => {
  res.send("Hello Everyone");
});

// CRUD - create, read, update, delete

// CREATE a new exercise routine
/*
let exerciseRoutine = new exercise({
  name: "Cycling",
  reps: 3,
  date: "Nov 5 2023",
  isDone: false,
});

exerciseRoutine.save();
*/

// HTTP Methods
// Post, Get, Put, Patch

// Post - add an exercise routine
app.post("/add_routine", async (_req, res) => {
  let exerciseRoutine = new exercise({
    name: _req.body.name,
    reps: _req.body.reps,
    date: _req.body.date,
    isDone: false,
  });

  let data = await exerciseRoutine.save();

  res.send(data);
});

// Get - read exercise routines
app.get("/get_routine", async (_req, res) => {
  try {
    let data = await exercise.find({});
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.send(`Failed to retrieve routines ${err}`);
  }
});

// Put - update routine
app.put("/update_routine", async (_req, res) => {
  try {
    let data = await exercise.findOneAndUpdate(
      { _id: "654841cfeae34f2de590b104" },
      { reps: "1000" }
    );
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

// Patch - update routine
app.patch("/update_routine", async (_req, res) => {
  try {
    let data = await exercise.findOneAndUpdate(
      { _id: "6548433e652ba73ff17c8c8e" },
      { date: "Oct 30 2023" }
    );
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

// Delete
app.delete("/delete_routine", async (_req, res) => {
  try {
    let data = await exercise.findOneAndDelete({
      _id: "65491bd215f74da08cc20c2b",
    });
    res.send(data);
    console.log(data, { message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
  }
});
