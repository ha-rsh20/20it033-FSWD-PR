var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "usbw",
  database: "xyz",
});

con.connect((err) => {
  if (err) {
    console.log("Cannot connect with database!");
  }
  console.log("Connection established!");
});

module.exports.connection = con;
