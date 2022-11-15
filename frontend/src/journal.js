import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';
import './App.css';
import React from 'react';

function JournalForm() {
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const [dateTime, setDate] = useState("");
    const [id,setID] = useState("");
    const [notesArray, setNotesArray] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    // var buttonText = showNotes ? "Hide Notes" : "Show Notes";

    const getNotes = () => {
      Axios.get("http://localhost:3306/getNotes").then((response) => {
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
   Axios.post("http://localhost:3306/insert", {
      title: title, 
      note: note, 
      dateTime: dateTime,
    })
    .then(() => {
      console.log("Successful note add!");
    })
   }

   const updateNote = () =>{
      Axios.put("http://localhost:3306/update", { 
         id:id,
         title: title, 
         note: note, 
         dateTime: dateTime,
     }).then(() => {
         console.log("Edits updated successful");
     });
   }

   const deleteNote = (id) => {

      let answer = window.confirm("Are you sure want to delete?");
        if (answer) {
          Axios.delete(`http://localhost:3306/delete/${id}`).then((response) => {
            setNotesArray(
                notesArray.filter((val) => {
                    return val.id != id;
                })
            )
          });
        }
    }

    return (
      <div class = "journal">
         <div class="journal__preview">
            <input class="journal__title" type="text"  
            placeholder="New Journal Entry Title..." 
               onChange={(event) =>{
               setTitle(event.target.value);}}></input>
            <textarea class="journal__body" 
               onChange={(event) =>{
               setNote(event.target.value);
               } }
               placeholder="Journal here..."
               ></textarea>
         </div>
         { <div class="journal__sidebar">
            <button onClick={addNote} class="journal__add" type="button">Add Note</button>
            <button onClick={updateNote} class="journal__update" type="button">Update Note</button>
            <button onClick={() => {
              getNotes();
              showAllNotes();
              }}
              class="journal__getNote" type="button">Show All Notes
              </button>
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