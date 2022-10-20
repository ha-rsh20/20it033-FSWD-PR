const express = require("express");
const mongoose = require("mongoose");
const student = require("./student_model");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/xyz")
  .then(() => console.log("Connection Established!"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/app/showAllStudents", (req, res) => {
  student.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    res.status(200).send(data);
  });
});

app.get("/app/showStudent/:id", (req, res) => {
  student.findOne({ id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    res.status(200).send(data);
  });
});

app.post("/app/addStudent", (req, res) => {
  let newStudent = new student({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  });
  newStudent
    .save()
    .then((student) => {
      res.status(201).send(student);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/updateStudent/:id", (req, res) => {
  let updateStudent = {};
  if (req.body.id) {
    updateStudent.id = req.body.id;
  }
  if (req.body.name) {
    updateStudent.name = req.body.name;
  }
  if (req.body.email) {
    updateStudent.email = req.body.email;
  }

  student
    .updateOne({ id: req.params.id }, { $set: updateStudent })
    .then(() => {
      res.status(200).send(updateStudent);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.delete("/app/deleteStudent/:id", (req, res) => {
  student
    .remove({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(4000, () => console.log("Listening on port 4000..."));
