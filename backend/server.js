const express = require("express");
const app = express();
const port = 3307; 
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");


var connection = mysql.createConnection({ //newly added!
    connectionLimit:10,
    host: "sql9.freemysqlhosting.net",
    user: "sql9579587", // mysql id
    password: "blq8zUBtEj", // mysql password
    database: "sql9579587", //database name
});
  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.post("/passcode", (req, res) => { 
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
});


app.post("/insert", (req, res) => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTimeNow = date+' '+time;

  const title = req.body.title;
  const note = req.body.note;
  const dateTime = dateTimeNow;

  connection.query (
      "INSERT INTO JournalEntries (title, body, datetime) VALUES (?, ?, ?)", [title, note, dateTime], 
      (err, result) => {
          if (err) {
              console.log(err);
          }
          else {
              res.send(result);
          }
      }
  );

})


app.get("/getNotes", (req, res) => {
  connection.query("SELECT * FROM JournalEntries ORDER BY dateTime DESC ", (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.send(result)
      }
  });
});

app.get("/getPassword", (req, res) => {
  connection.query("SELECT password FROM userPassword WHERE id = LAST_INSERT_ID(id) order by LAST_INSERT_ID(id) desc limit 1", (err,result) => {
    if(err) {
      console.log(err);
    }else {
      res.send(result);
    }
  })
})

app.get("/getTodos", (req, res) => {
  connection.query("SELECT * FROM todoList  ", (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.send(result)
      }
  });
});

app.post("/insertTodo", (req, res) => {
    connection.query (
        "INSERT INTO todoList (todo, isCompleted, datetime) VALUES (?, ?, ?)", [req.body.todo, req.body.isCompleted, req.body.dateTime], 
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
                window.alert("Checklist Successfully Saved!");
            }
        }
    );
  
  })

app.put("/update/:id", (req, res) => {

  const id = req.params.id;
  const title = req.body.title;
  const note = req.body.note;
  const dateTime = req.body.dateTime;;

  connection.query(
      "UPDATE JournalEntries SET title = ?, body = ?, dateTime = ? WHERE id = ?",
      [title, note, dateTime, id],
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

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM JournalEntries WHERE id= ?", id, (err,result)=>{
    if(err) {
      console.log(err);
    } else{
      console.log(result);
      console.log("note deleted!");
    }
  })
})

app.delete("/deleteTodo/:id", (req, res) => {
        const id = req.params.id;
        console.log(id)
        connection.query("DELETE FROM todoList WHERE id= ?", id, (err,result)=>{
          if(err) {
          console.log(err)
        } else {
          console.log(result);
          window.alert("Checklist Deleted!");
        }
    })
    })

    app.put("/updateTodo", (req, res) => {
        console.log(req.body.id)
        console.log(req.body.status)
        console.log(req.body.todo)
        console.log(reg.body.dateTime)

        const id = req.body.id;
        const status = req.body.status;
        const todo = req.body.todo;
        const dateTime = req.body.dateTime;

        connection.query(
            "UPDATE todoList SET isCompleted = ?, dateTime = ?, todo = ? WHERE id = ?",[status, dateTime, todo, id],
            (err, result) => {
                if (err) {
                  console.log(err);
                }
                else {
                  res.send(result);
                  window.alert("Checklist Updated Successfully!");
                }
            }
        );
      });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
