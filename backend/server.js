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
  
// connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/passcode", (req, res) => { //데이터 받는 곳
    const id = req.body.inText;
    console.log(id);
    // connection.query("INSERT INTO users (user_id) values(?)", [user_id],
    //   function (err, rows, fields) {
    //     if (err) {
    //       console.log("DB save fail");
    //     } else{
	  //     console.log("DB save success!");
    //   };
    const sendText = {
    text: "sending data success",
  };
  res.send(sendText);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});