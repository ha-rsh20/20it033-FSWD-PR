const express = require("express");
const studentRoutes = require("./student");

const app = express();
app.use(express.json());
app.use("/app", studentRoutes);

app.listen(4000, () => console.log("Listening on port 4000..."));
