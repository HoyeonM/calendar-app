import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';

function JournalForm() {
    const [journalInput, setJournalInput] = useState("");
    const [journalTitle, setJournalTitle] = useState("");


   const testNoti = () =>{
      Notification.requestPermission().then(function (result){
         var myNotification = new Notification('Electron Notification',{
            'body': "HELLO, THIS IS A TEST NOTIFICATION",
         });
      });
   }
   const addJournal = () => {
      Axios.post("http://localhost:3001/journal", {
         journalTitle: journalTitle,
         journalInput: journalInput,
      }).then(() => {
            console.log("Added data successfully");
      });
    };

    return (
      <div class = "journal">
         {/* <div class="journal__sidebar">
            <button onClick={addJournal} class="journal__add" type="button">Add Note</button>
            <div class="journal__list"></div>
            <button onClick={testNoti} class="noti" type="button">Test Notification</button>
         </div> */}
         <div class="journal__preview">
            <input class="journal__title" type="text"  
            placeholder="New Journal Entry Title..." 
               onChange={(event) =>{
               setJournalTitle(event.target.value);}}></input>
            <textarea class="journal__body" 
               onChange={(event) =>{
               setJournalInput(event.target.value);
               } }
               placeholder="Journal here..."
               >
               </textarea>
         </div>
         <div class="journal__sidebar">
            <button onClick={addJournal} class="journal__add" type="button">Add Journal</button>
            <div class="journal__list"></div>
            <button onClick={testNoti} class="noti" type="button">Test Notification</button>
         </div>
      </div>  
    );
 }

 export default JournalForm;