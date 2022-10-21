const express = require("express");
const Router = express.Router();
const dbconn = require("./dbconnect");

Router.get("/showAllStudents", (req, res) => {
  dbconn.connection.query("select * from student", (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    res.status(200).send(data);
  });
});

Router.get("/showStudent/:id", (req, res) => {
  dbconn.connection.query(
    "select * from student where id=" + req.params.id,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      }
      res.status(200).send(data);
    }
  );
});

Router.post("/addStudent", (req, res) => {
  dbconn.connection.query(
    "insert into student(id, name, email) VALUES (" +
      req.body.id +
      ",'" +
      req.body.name +
      "','" +
      req.body.email +
      "')",
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).send(data);
    }
  );
});

Router.put("/updateStudent/:id", (req, res) => {
  dbconn.connection.query(
    "UPDATE student SET id=" +
      req.body.id +
      ",name='" +
      req.body.name +
      "',email='" +
      req.body.email +
      "' WHERE id=" +
      req.params.id,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(data);
    }
  );
});

Router.delete("/deleteStudent/:id", (req, res) => {
  dbconn.connection.query(
    "delete from student where id=" + req.params.id,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(data);
    }
  );
});
module.exports = Router;
