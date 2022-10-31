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
  
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// app.post("/passcode", (req, res) => { 
//     const p_passcode = JSON.stringify(req.body.inText);
//     const parsepasscode = JSON.parse(p_passcode);
//     const passcode = parsepasscode.passcode;
//     console.log(passcode); 

//     connection.query("INSERT INTO users (passcode) values(?)", [passcode]);
      
//     const sendText = {
//       text: 'your new password is : ' + passcode,
//     };
//     res.send(sendText);

// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});