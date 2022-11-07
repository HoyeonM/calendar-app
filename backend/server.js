const express = require("express");
const app = express();
const port = 3307; 
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({ //newly added!
    connectionLimit:10,
    host: "sql9.freemysqlhosting.net",
    user: "sql9531512", // mysql id
    password: "Ehie5kJScc", // mysql password
    database: "sql9531512", //database name
    });
  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/passcode", (req, res) => { //데이터 받는 곳
    const json = req.body.inText;
    const obj = JSON.parse(json);
    const passcode = obj.passcode;
    console.log(passcode);
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
    connection.query("INSERT INTO userPassword (password) values(?)", [passcode]);

    const sendText = {
      text: "your passcode is " + passcode
    };
    res.send(sendText);

    connection.release();

});


app.post("/insert", (req, res) => {
// let datetime = new Date();
//         let dateResult = datetime.toLocaleDateString("pt-br", {
//             year: "numeric",
//             month: "2-digit",
//             day: "2-digit",
//             hour: 'numeric',
//             minute: 'numeric',
//             second: 'numeric',
//   });
  const title = req.body.title;
  const note = req.body.note;
  const dateTime = req.body.dateTime;

  connection.query (
      "INSERT INTO JournalEntries (title, body, datetime) VALUES (?, ?, ?)", [title, note, dateTime], 
      (err, result) => {
          if (err) {
              console.log(err);
          }
          else {
              res.send("Values inserted");
          }
      }
  );

})

app.get("/getNotes", (req, res) => {
  connection.query("SELECT * FROM JournalEntries", (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.send(result)
      }
  });
});

app.put("/update", (req, res) => {
  
  const id = 2;
  const title = req.body.title;
  const note = req.body.note;
  const dateTime = req.body.dateTime;;

  connection.query(
      "UPDATE JournalEntries SET title = ?, body = ?, dateTime = ? WHERE id = ?",
      [title, note, dateTime, 2],
      (err, result) => {
          if (err) {
              console.log(err);
          }
          else {
              res.send(result);
          }
      }
  );
});

app.delete("/delete", (req, res) => {
  const id = 2;
  connection.query("DELETE FROM JournalEntries WHERE id = ?", id, (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.send(result);
      }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
