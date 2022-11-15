import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';
import './App.css';
import React from 'react';

function JournalForm() {
    let currentId = 0;
    const [note, setNote] = useState('');
    const [title, setTitle] = useState("");
    const [dateTime, setDate] = useState("");
    const [id,setID] = useState(0);
    const [notesArray, setNotesArray] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    // var buttonText = showNotes ? "Hide Notes" : "Show Notes";

    const getNotes = () => {
      Axios.get("http://localhost:3307/getNotes").then((response) => {
        setNotesArray(response.data);
        console.log(response.data);
      })
    }

    const showAllNotes = () => {
      setShowNotes(true);
    }

    // const hideAllNotes = () => {
    //   setShowNotes(false);
    // }
    
   const addNote = () => {
   Axios.post("http://localhost:3307/insert", {
      title: title, 
      note: note, 
      dateTime: dateTime,
    })
    .then(() => {
      console.log("Successful note add!");
    })
   }

   const updateNote = () =>{
    Axios.put("http://localhost:3307/update", { 
       id:id,
       title: title, 
       note: note, 
       dateTime: dateTime,
   }).then(() => {
       console.log("Edits updated successful");
   });
 }

   const deleteNote = (id) => {
      console.log(id);
      let answer = window.confirm("Are you sure want to delete?");
        if (answer) {
          Axios.delete(`http://localhost:3307/delete/${id}`).then((response) => {
            setNotesArray(
                notesArray.filter((val) => {
                    return val.id != id;
                })
            )
          });
        }
    }
    const setCurrentView = (id) =>{
      setTitle(notesArray[id].title);
      setNote(notesArray[id].body);
      // document.getElementById('up').onclick = function() {
      //   updateNote(currentId);
      //  }
    }

    // const handleClick = event => {
    //   // refers to the div element
    //   //console.log(event.target.id);
    //   //console.log('div clicked');
  
    // };
    
    document.addEventListener('click', (e) =>
    {
      // Retrieve id from clicked element
      let elementId = e.target.id;
      // If element has id
      if (elementId !== '') {
          setCurrentView(elementId);
      }
    }
    
  );
    return (
      <div class = "journal">
         <div class="journal__preview">
            <input class="journal__title" type="text"  value={title} 
            placeholder="New Journal Entry Title..." 
               onChange={(event) =>{
               setTitle(event.target.value);}}></input>
            <textarea class="journal__body" value={note}
               onChange={(event) =>{
               setNote(event.target.value);
               } }
               placeholder="Journal here..."
               ></textarea>
         </div>
         { <div class="journal__sidebar">
            <button onClick={addNote} class="journal__add" type="button">Add Note</button>
<<<<<<< HEAD
            <button onClick={updateNote} class="journal__update" type="button">Update Note</button>
=======
            <button onClick = {updateNote} class="journal__update" type="button">Update Note</button>
>>>>>>> 535ac8b93cd9d20a2b18562cc6193e8d3a572087
            <button onClick={() => {
              getNotes();
              showAllNotes();
              }}
              class="journal__getNote" type="button">Show All Notes
              </button>
<<<<<<< HEAD
              <div className='notes'>
                {notesArray.map((notes,index) => {
                  return (
                    <div key={index}>
                      <p className='notes_content'> Title: {notes.title}</p>
                      <p className='notes_content'> Body: {notes.body}</p>
                      <p className='notes_content'> Time Added: {notes.dateTime}</p>
                      
                      <button className="headerbtn" onClick={deleteNote}>
                        <span class="material-symbols-outlined">delete</span> 
                      </button>
=======
              <div  className='notes' >
                {notesArray.map((notes,index) => {
                  return (
                    <div key={index} id = {index} >
                      <button onClick={deleteNote} class="journal__delete" type="button">Delete Note</button>
                      <p> Title: {notes.title}</p>
                      <p> Body: {notes.body}</p>
                      <p> Time Added: {notes.dateTime}</p>
>>>>>>> 535ac8b93cd9d20a2b18562cc6193e8d3a572087
                    </div>
                );
                
            })}
      
            </div>
            {/* <button className='hide-notes'>Hide Notes</button> */}
         </div> 
         }
      </div>  
    );
 }

 export default JournalForm;
