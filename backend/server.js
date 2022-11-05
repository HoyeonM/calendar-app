const express = require("express");
const app = express();
const port = 3306; 
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

    //connection.release();

});

app.post("/tag", (req, res) => {
  const json = req.body.inText;
  const obj = JSON.parse(json);
  const tag = obj.tag;
  console.log(tag);

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  connection.query("INSERT INTO Tags (value) values(?)", [tag]);

  const sendText = {
    text: "New tag created: " + tag
  };
  res.send(sendText);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})