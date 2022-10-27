const express = require("express");
const app = express();
const port = 3001; 
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: 'MyNewPass', 
    database: "DailyLife",
   })
// connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/journal", (req, res) => {
  const journalTitle = req.body.journalTitle;
  const journalInput = req.body.journalInput;

  db.query(
    "INSERT INTO journal (title, body) VALUES (?,?)",
    [journalTitle, journalInput],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});