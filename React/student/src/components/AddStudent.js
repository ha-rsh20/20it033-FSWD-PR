import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AddStudent(props) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const { stdId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (stdId) {
      axios
        .get("http://localhost:4000/app/showStudent/" + stdId)
        .then((response) => {
          if (response.data) {
            setId(response.data.id);
            setName(response.data.name);
            setEmail(response.data.email);
          }
        })
        .catch((error) => props.showAlert("danger", error));
    }
  }, []);

  let txtChng = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  let Student = {
    id: id,
    name: name,
    email: email,
  };

  let saveStudent = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/app/addStudent", Student)
      .then((response) => {
        if (response.data != null) {
          props.showAlert("success", "Result added successfully!");
        }
      })
      .catch((err) => {
        props.showAlert("danger", "Error occured to add result!");
      });
  };

  let updateStudent = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:4000/app/updateStudent/" + stdId, Student)
      .then((response) => {
        if (response.data != null) {
          props.showAlert("success", "Result updated successfully!");
          navigate("/getStudent");
        }
      })
      .catch((err) =>
        props.showAlert("danger", "Error occured to update result!")
      );
  };

  return (
    <div>
      <Container className="mt-3">
        <Form onSubmit={stdId != null ? updateStudent : saveStudent}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={name}
              type="text"
              placeholder="Enter Name"
              onChange={txtChng}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ID</Form.Label>
            <Form.Control
              name="id"
              value={id}
              type="text"
              placeholder="Enter ID"
              onChange={txtChng}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={email}
              type="text"
              placeholder="Enter email"
              onChange={txtChng}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {stdId != null ? "Update" : "Submit"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}
