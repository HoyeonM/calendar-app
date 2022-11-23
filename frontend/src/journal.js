import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';
import './App.css';
import React, {useEffect} from 'react'
var x = 2;   

function Journal() {
  let currentId = 1;
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [dateTime, setDate] = useState("");
  //const [id,setID] = useState(0);
  const [notesArray, setNotesArray] = useState([]);
  var loaded = true;


  useEffect ( () => {
        Axios.get("http://localhost:3307/getNotes")
        .then(res=>setNotesArray(res.data))
  }, []);

  const getNotes = ()=>{
    Axios.get("http://localhost:3307/getNotes").then((res) => {
      setNotesArray(res.data);
    })
  }

 const addNote = () => {
    Axios.post("http://localhost:3307/insert", {
      title: title, 
      note: note, 
      dateTime: dateTime,
    })
   .then(res => {
      console.log("Successful note add!");
    })
    getNotes();
    console.log(notesArray);
   // displayNotes();
 }

 const deleteNote = (id) => {
  Axios.delete(`http://localhost:3307/delete/${id}`).then((response)=>{
      alert("you deleted a post")
  })
}

const handleClick = event => {
  const child = document.getElementById('dom');

  child.parentElement.remove();
  console.log(event.target.id);
  console.log('div clicked');

};
function reload(deletingNoteID){
  var div = document.getElementById(deletingNoteID);
  div.parentNode.removeChild(div);
}


    return (
      <div className = "journal" >
         
            <div className="note">
            <div className="note-input" >
              <div className="note-wrapper">
                <input type="text" id = "note-title" placeholder="Title of your note" 
                  onChange={(event) =>{
                    setTitle(event.target.value);}}></input>
                <textarea  id="note-content" placeholder="Write your note here...." rows="5"
                onChange={(event) =>{
               setNote(event.target.value);
               } }></textarea>

                <button onClick={addNote} 
                 id="add-note-btn" className="btn" type = "button"   >
                  <span><i className="fas fa-plus"></i></span>
                  Add Note
                </button>
              </div>
            </div>
            
            <div className="note-list" onLoad={getNotes}>           
            {Array.isArray(notesArray) ?
                notesArray.map((notes,index) => {
                  return (
                    <div id = {notes.dateTime} className='note-item' key={index}>
                      <h1 className='notes_content'> {notes.title}</h1>
                      <p className='notes_content'> {notes.body}</p>
                      <p className='notes_content'> {notes.dateTime}</p>
                      
                      <button className="notes_btn" onClick={e=> {
                        deleteNote(notes.id);
                        reload(notes.dateTime);
                      }}>Delete</button>

                    </div>
                )})
              : null}
            </div>
            
            
          </div>
         
      </div>  
    );
}

 export default Journal;
