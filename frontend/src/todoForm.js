import React, { useState,useEffect } from "react";
import Axios from 'axios';
import './App.css';
import { v4 } from 'uuid'

function TodoForm() {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [dateTime, setDate] = useState("");

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
    useEffect ( () => {
      getTodos();
}, []);

    const getTodos = ()=>{
      console.log("Trying to get todos")
      Axios.get("http://localhost:3307/getTodos").then((res) => {
        console.log(res.data)
        setTodos(res.data);
      })
    }
  
    const addTodo = () => {
      Axios.post("http://localhost:3307/insertTodo", {
        todo: currentTodo,
        dateTime: dateTime, 
        isCompleted: false, 
      })
     .then(res => {
        console.log("Successful todo add!");
        window.alert("Saved Checklist Successfully!");
        getTodos();
      })
   }

   const deleteTodoDB = (id) => {
  
      Axios.delete(`http://localhost:3307/deleteTodo/${id}`)
      .then((res)=>{
        console.log(res.data);
        console.log("todo deleted!");
        window.alert("Deleted Checklist Succesfully!");
      })
  }

  const completeTodoDB = (id, status, todo, dateTime)=>{
    console.log("trying to update todos")
    //console.log(status)
    Axios.put(`http://localhost:3307/updateTodo`, {
      id: id,
      status: status,
      todo: todo,
      dateTime: dateTime
    })
    .then((res) => {
      console.log("Updated Todo")
      window.alert("Checklist Updated!");
    })
  }

    function createNewTodo(currentTodo) {
      let todosArray = [...todos];
      todosArray.push({
        todo: currentTodo,
        isCompleted: false,
        dateTime: dateTime
      });
      setTodos(todosArray);
      getTodos();
      addTodo();
    }
  
    function completeTodo(index) {
      let todosArray = [...todos];
      todosArray[index].isCompleted = !todosArray[index].isCompleted;
      setTodos(todosArray);
      let stat = todos[index].isCompleted;
      completeTodoDB(todos[index].id,stat)
    }
  
    function deleteTodo(index) {
      let todosArray = [...todos];
      todosArray.splice(index, 1);
      setTodos(todosArray);
      deleteTodoDB(todos[index].id)
    }
  
    return (
      <div>
        <input
          className="todo-input"
          value={currentTodo}
          placeholder="What needs to get done?"
          onChange={e => {
            setCurrentTodo(e.target.value);
          }}
        />
        <input
          className="todoDueDate-input"
          value={dateTime}
          placeholder= {date}
          onChange={e => {
            setDate(e.target.value);
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              createNewTodo(currentTodo);
              setCurrentTodo("");
              setDate("");
            }}}
        />
        <div className="alltodos">
        {todos.map((todo, index) => (
                  <div key={v4()} className="todo" id = {todo.todo}> 
                  <div key={v4()} className="todoDueDate" id = {todo.dateTime}>
                  <div key={v4()} className="checkbox" onClick={() => completeTodo(index)}>
                     {todo.isCompleted && <span>&#x2714;</span>}
                  </div>
                    <div key={v4()} className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
                    <div key={v4()} className="delete" onClick={() => deleteTodo(index)}>
                    &#128465;
                    </div>
                </div>
              </div>

        ))}
          </div>
        {todos.length > 0 && `${todos.length} items`}
      </div>
    );
  }
 export default TodoForm;
