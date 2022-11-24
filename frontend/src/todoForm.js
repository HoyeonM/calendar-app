import React, { useState,useEffect } from "react";
import Axios from 'axios';
import './App.css';
import { v4 } from 'uuid'



function TodoForm() {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [dateTime, setDate] = useState("");

    useEffect ( () => {
      getTodos();
}, []);

    const getTodos = ()=>{
      console.log("trying to get todos")
      Axios.get("http://localhost:3307/getTodos").then((res) => {
        console.log(res.data)
        setTodos(res.data);
      })
    }
  
    const addTodo = () => {
      Axios.post("http://localhost:3307/insertTodo", {
        todo: currentTodo, 
        isCompleted: false, 
      })
     .then(res => {
        console.log("Successful todo add!");
        getTodos();
      })
   }

   const deleteTodoDB = (id) => {
  
      Axios.delete(`http://localhost:3307/deleteTodo/${id}`).
      then((res)=>{
        console.log(res.data);
        console.log("todo deleted!");
      })
    
  }

  const completeTodoDB = (id,status)=>{
    console.log("trying to update todos")
    //console.log(status)
    Axios.put(`http://localhost:3307/updateTodo`, {
      id: id,
      status: status
    })
    .then((res) => {
      console.log("updated todo")
    })
   // getTodos();
  }

    function createNewTodo(currentTodo) {
      let todosArray = [...todos];
      todosArray.push({
        todo: currentTodo,
        isCompleted: false
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
      <div >
        <input
          className="todo-input"
          value={currentTodo}
          onChange={e => {
            setCurrentTodo(e.target.value);
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              createNewTodo(currentTodo);
              setCurrentTodo("");
            }
          }}
          placeholder="What needs to get done?  Press Enter to submit..."
        />
        <div className="alltodos">
        {todos.map((todo, index) => (
                <div key={v4()} className="todo" id = {todo.dateTime}>
                    <div key={v4()} className="checkbox" onClick={() => completeTodo(index)}>
                    {todo.isCompleted && <span>&#x2714;</span>}
                    </div>
                    <div key={v4()}   className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
                    <div key={v4()}  className="delete" onClick={() => deleteTodo(index)} >
                    &#128465;
                    </div>
                </div>
        
        ))}
          </div>
        {todos.length > 0 && `${todos.length} items`}
      </div>
    );
  }
 export default TodoForm;
