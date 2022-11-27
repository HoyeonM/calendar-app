import { Component, useLayoutEffect, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';
import './App.css';
import React, {useEffect} from 'react'

function Journal() {

  const [passcode, setPasscode] = useState([]);
  var toHidePassword = 0;
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [dateTime, setDate] = useState("");
  const [notesArray, setNotesArray] = useState([]);


  useEffect ( () => {
    getPassword();
        Axios.get("http://localhost:3307/getNotes")
        .then(res=>setNotesArray(res.data))
  },[]);


  const getNotes = ()=>{
    Axios.get("http://localhost:3307/getNotes").then((res) => {
      setNotesArray(res.data);
    })
  }

  const getPassword = () => {
    Axios.get("http://localhost:3307/getPassword").then((res) => {
      setPasscode(res.data);
      console.log(res.data);
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
      console.log(res.data);
    })
    getNotes();
    console.log(notesArray);
    window.location.reload();
 }

  function resetinput (){
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
  }


 const deleteNote = (id) => {
  if(window.confirm("You really want to delete this note?")){
    Axios.delete(`http://localhost:3307/delete/${id}`).then((res)=>{
      console.log(res.data);
    })
  }
}

const hideAllNotes = () => {
  setNotesArray(null);
}

function reload(deletingNoteID){
  var div = document.getElementById(deletingNoteID);
  div.parentNode.removeChild(div);
}


function blurExisting(){
    return(
      <div>
      {Array.isArray(notesArray)?
        notesArray.map((notes,index) => {
          if((localStorage.getItem(notes.dateTime) == '1')){
            var div = document.getElementById(notes.dateTime).children
            div[0].style.filter = "blur(5px)";
            div[1].style.filter = "blur(5px)";
            div[2].style.filter = "blur(5px)";
          }
        }) : null }
        </div>
    ); 
}


useLayoutEffect(()=>{
  blurExisting();
})

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

                <button onClick={()=>{
                  addNote();
                  getNotes();
                  resetinput();
                }}
                 id="add-note-btn" className="btn" type = "button"   >
                  <span><i className="fas fa-plus"></i></span>
                  Add Note
                </button>

                <button onClick={getNotes} 
                 id="getAll-note-btn" className="btn" type = "button"   >
                  <span><i className="fas fa-plus"></i></span>
                  Show All Notes
                </button>

                <button onClick={hideAllNotes} 
                 id="hideAll-note-btn" className="btn" type = "button"   >
                  <span><i className="fas fa-plus"></i></span>
                  Hide All Notes
                </button>

                
              </div>
            </div>
            
            <div className="note-list" onLoad={getNotes}>  

            {Array.isArray(notesArray) ?
                notesArray.map((notes,index) => {
                    return(
                     
                      <div id = {notes.dateTime} className='note-item' key={index} >
                      <h1 className='notes_content'> {notes.title}</h1>
                      <p className='notes_content'> {notes.body}</p>
                      <p className='notes_content'> {notes.dateTime}</p>
                      <button className="notes_btn" onClick={()=> {
                        deleteNote(notes.id);
                        reload(notes.dateTime);
                      }}>Delete</button>
      
                      <button className="notes_btn_hide" onClick={() => {
                        getPassword();
                      const enteredPassword = prompt('Please enter your password:');
                       if(passcode[0].password == enteredPassword){
                           localStorage.setItem(notes.dateTime, "1");
                            const collection = document.getElementById(notes.dateTime).children;
                            collection[0].style.filter = "blur(5px)";
                            collection[1].style.filter = "blur(5px)";
                            collection[2].style.filter = "blur(5px)";
                       }else{
                         console.log("not match")
                         window.alert("retry");
                       }
                      }}>Hide</button>

                      <button id = 'show' className="notes_btn_show" onClick={() => {
                        getPassword();
                        const enteredPassword = prompt('Please enter your password:');
                          if(passcode[0].password == enteredPassword){
                          localStorage.setItem(notes.dateTime, "0");
                             const collection = document.getElementById(notes.dateTime).children;
                              collection[0].style.filter = "blur(0px)";
                              collection[1].style.filter = "blur(0px)";
                              collection[2].style.filter = "blur(0px)";
                         }else{
                           console.log("not match")
                           window.alert("retry");
                         }
                      }}>Show</button> 

                    </div>
                )})
                
              : null}
              
            </div>
          </div>
      </div>  
    );
}
 export default Journal;
