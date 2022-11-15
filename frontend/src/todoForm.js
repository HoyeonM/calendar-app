import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
//import Calendar from 'react-calendar';
import { useState } from 'react';
import "./App.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';

function TodoForm() {
   const [id,setID] = useState("");
   const [title, setTitle] = useState("");
   const [entry, setEntry] = useState("");
   const [dueDate, setDueDate] = useState(new Date());
   //sconst [checklist, setChecklist] = useState("");
   const [checklistArray, setChecklistArray] = useState([]);
   
    const addChecklist = () => {
      Axios.post("http://localhost:3306/insertChecklist", {
         id: id,
         title: title, 
         entry: entry, 
         dueDate: dueDate,
       })
       .then(() => {
         console.log("Checklist successfully added!");
       })
      }
   
      const updateChecklist = () =>{
         Axios.put("http://localhost:3306/updateChecklist", { 
            id:id,
            title: title, 
            entry: entry, 
            dueDate: dueDate,
        }).then(() => {
            console.log("Checklist successfully added!");
        });
      }
   
      const deleteChecklist = (id) => {
         let answer = window.confirm("Are you sure want to delete?");
           if (answer) {
             Axios.delete(`http://localhost:3306/deleteChecklist/${id}`).then((response) => {
               setChecklistArray(
                   checklistArray.filter((val) => {
                       return val.id !== id;
                   })
               )
             });
           }
       }
   
    return (
      <div class = "todo">
        <div class = "todo_preview">
          <label for = "todo"> </label>
            <input className = "todo_title"
              type = "text"
              placeholder = 'Enter Title'
              onChange={(event) =>{
                setTitle(event.target.value);}}>
            </input>
            <textarea className = "todo_body"
              rows = {10}
              cols = {175}
              onChange = {(event) => {
                setEntry(event.target.value);
                }}
              placeholder = "Enter Checklist Entry Here">
            </textarea>
            <span for = "dueDate" className='todoDuedate'>Checklist Due Date: " {dueDate.toDateString()} "
            </span>
       
        </div>
        <div class = "todo_sidebar">
          <button class = "todo_save"
            onClick = {addChecklist} 
            type = "button">Save</button>
          {/*
          <button class="checklist__update"
            onClick={updateChecklist}  
            type="button">Update Checklist</button>
          */}
          <button class = "todo_delete"
            onClick = {deleteChecklist}
            type = "button">Delete</button>
        </div>
      </div>  
    );  
 } 

export default TodoForm;
