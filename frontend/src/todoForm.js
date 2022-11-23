import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import "./App.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from 'react';
import Axios from 'axios';

function TodoForm() {
  let currentId = 0;
  const [id,setID] = useState(0);
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  //const [checklist, setChecklist] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checklistArray, setChecklistArray] = useState([]);
   
  const getChecklist = () => {
    Axios.get("http://localhost:3307/getChecklist").then((res) => {
      setChecklistArray(res.data);
      console.log(res.data);
    })
  }

  const hideAllChecklists = () => {
    setChecklistArray(null);
  }

  const emptyInput = () =>{
    setTitle("");
    setEntry("");
    setDueDate("");
  }
  
  const addChecklist = () => {
    Axios.post("http://localhost:3307/insertChecklist", {
      title: title, 
      entry: entry, 
      dueDate: dueDate,
    })
    .then(res => {
      console.log("Checklist successfully added!");
      window.alert("Checklist successfully saved!");
    })
  }
   
  const updateChecklist = () =>{
    Axios.put("http://localhost:3307/updateChecklist", { 
      title: title, 
      entry: entry, 
      dueDate: dueDate,
    }).then(() => {
      console.log("Checklist successfully updated!");
      window.alert("Checklist successfully updated!");
    });
  }
   
  const deleteChecklist = (title) => {
    console.log(title);
    let answer = window.confirm("Are you sure want to delete?");
    if (answer) {
      Axios.delete("http://localhost:3307/deleteChecklist", {
        title: title
      })
    .then(res => {
      console.log(res);
      console.log(res.data);
      setChecklistArray(
        checklistArray.filter((item) => {
          return item.title !== title;
        })
      )});
    }
  }
   
  const setCurrentView = (id) =>{
    setTitle(checklistArray[id].title);
    setEntry(checklistArray[id].body);
    setDueDate(checklistArray[id].dueDate);
    // document.getElementById('up').onclick = function() {
    //   updateChecklist(currentId);
    //  }
  }

  const handleClick = event => {
    console.log(event.target.id);
    console.log('div clicked');
  };

  return (
    <div class = "todo">
      <div class = "todo_preview">
          <input class = "todo_title"
            type = "text"
            value = {title}
            placeholder = "Type Checklist Title Here."
            onChange={(event) =>{
              setTitle(event.target.value);
              }}>
          </input>
          <textarea class = "todo_body"
            rows = {10}
            cols = {175}
            value = {entry}
            onChange = {(event) => {
              setEntry(event.target.value);
            }}
            placeholder = "Enter Checklist Entry Here">
          </textarea>
          <input class = "todoDueDate"
            type = "text"
            value = {dueDate}
            placeholder = "Type Due Date Here."
            onChange = {(event) => {
              setDueDate(event.target.value);
            }}>
            </input>
        </div>
        {
          <div class = "todo_sidebar">
          <button onClick={() => {
            addChecklist();
            emptyInput();
          }}
          class = "todo_save"
          type = "button">Save Checklist</button>
          <button onClick = {updateChecklist}
            class = "todo_update"
            type = "button">Save Checklist</button>
          {/*
            <button onClick = {deleteChecklist}
            class = "todo_delete"
            type = "button">Delete Checklist</button>
        */}
          <button onClick={() => {
              getChecklist(); }}
              class="todo_getChecklist" 
              type="button">Show Checklists</button>
              <button onClick={()=> {
                hideAllChecklists();
              }}
              >Hide All</button>

              <div className='checklists'>
                {Array.isArray(checklistArray) ? 
                checklistArray.map((checklist, index) => {
                  return (
                    <div key={index}>
                      <p className='checklist_content'> Title: {checklist.title}</p>
                      <p className='checklist_content'> Body: {checklist.body}</p>
                      <p className='checklist_content'> Time Added: {checklist.dueDate}</p>
                      
                      <button className="deletebtn" onClick={e=> {
                        handleClick(e, index);
                        deleteChecklist(checklist.title);
                      }}>Delete Checklist</button>

                      <button onClick={e=>{
                        handleClick(e,index);
                        // hideChecklist(entry.title);
                      }}
                      className='checklist_btn'>Hide</button>
                    </div>
                  )})
                : null}
              </div>
         </div>}
      </div>  
    );
 }
  
export default TodoForm;
