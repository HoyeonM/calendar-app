import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';

function JournalForm() {
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const [dateTime, setDate] = useState("");
    const [id,setID] = useState("");
    const [notesArray, setNotesArray] = useState([]);

    async function getNotes() {
      await Axios.get("http://localhost:3307/getNotes").then((response) => {
        setNotesArray(response.data);
        console.log(response.data);
      })
    }
  
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

    return (
      <div class = "journal">
         { <div class="journal__sidebar">
            <button onClick={addNote} class="journal__add" type="button">Add Note</button>
            <button onClick={updateNote} class="journal__update" type="button">Update Note</button>
            <button onClick={deleteNote} class="journal__delete" type="button">Delete Note</button>

         </div> }
         <div class="journal__preview">
            <input class="journal__title" type="text"  
            placeholder="New Journal Entry Title..." 
               onChange={(event) =>{
               setTitle(event.target.value);}}></input>
            <textarea class="journal__body" 
               onChange={(event) =>{
               setNote(event.target.value);
               } }>Journal here...</textarea>
         </div>
      </div>  
    );
 }

 export default JournalForm;