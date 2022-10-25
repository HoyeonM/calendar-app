const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // << 새로 추가된 부분

// var connection = mysql.createConnection({
//     /// 새로 추가된 부분
//     connectionLimit:10,
//     host: "127.0.0.1",
//     user: "root", // mysql에 아이디를 넣는다.
//     password: "password", // mysql의 비밀번호를 넣는다.
//     database: "dailylife1", //위에서 만든 데이터베이스의 이름을 넣는다.
//   });
  
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