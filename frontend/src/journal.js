import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';

function JournalForm() {
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

   const addJournal = () => {
      Axios.post("http://localhost:3001/create", {
         title: title,
         note: note,
      }).then(() => {
            console.log("Added data successfully");
      });
    };

    return (
      <div class = "journal">
         <div class="journal__sidebar">
            <button onClick={addJournal} class="journal__add" type="button">Add Note</button>
            <div class="journal__list"></div>
            <button onClick={testNoti} class="noti" type="button">Test Notification</button>
         </div>
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