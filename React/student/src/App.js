import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import GetStudent from "./components/GetStudent";
import NavBar from "./components/NavBar";
import { useState } from "react";
import NewAlert from "./components/NewAlert";

function App() {
  const [alert, setAlert] = useState(null);
  let showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <BrowserRouter>
      <NavBar />
      <NewAlert alert={alert} />
      <Routes>
        <Route
          path="/addStudent"
          element={<AddStudent showAlert={showAlert} />}
        />
        <Route
          path={"/addStudent/:stdId"}
          element={<AddStudent showAlert={showAlert} />}
        />
        <Route
          path="/getStudent"
          element={<GetStudent showAlert={showAlert} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
