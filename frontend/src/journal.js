import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';
import './App.css';
import React, {useEffect} from 'react'
import Modal from 'react-modal'; //this is for popup

function Journal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [hidePasscode, setHidePasscode] = useState("");
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [dateTime, setDate] = useState("");
  const [notesArray, setNotesArray] = useState([]);
  const [alertText, setAlertText] = useState("");

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect ( () => {
        Axios.get("http://localhost:3306/getNotes")
        .then(res=>setNotesArray(res.data))
  }, []);

  const handlChange = (e) => {
    setHidePasscode(e.target.value);
};

  const getNotes = ()=>{
    Axios.get("http://localhost:3306/getNotes").then((res) => {
      setNotesArray(res.data);
    })
  }

  const getPassword = () => {
    Axios.get("http://localhost:3306/getPassword").then((res) => {
      console.log(res.data);
      setPasscode(res.data);
      console.log({passcode});
    })
  }

  const passwordMatch = ()=>{
    if(hidePasscode===passcode){
      window.alert("match!");
    } else {
      window.alert("retry");
    }
  }


 const addNote = () => {
    Axios.post("http://localhost:3306/insert", {
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
 }
 
  function resetinput (){
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
  }


 const deleteNote = (id) => {
  if(window.confirm("You really want to delete this note?")){
    Axios.delete(`http://localhost:3306/delete/${id}`).then((res)=>{
      console.log(res.data);
    })
  }
}

const hideAllNotes = () => {
  setNotesArray("");
}

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
                  return (
                    <div id = {notes.dateTime} className='note-item' key={index}>
                      <h1 className='notes_content'> {notes.title}</h1>
                      <p className='notes_content'> {notes.body}</p>
                      <p className='notes_content'> {notes.dateTime}</p>
                      
                      <button className="notes_btn" onClick={e=> {
                        deleteNote(notes.id);
                        reload(notes.dateTime);
                      }}>Delete</button>

                      <button className="notes_btn" onClick={openModal}
                      >
                        Hide
                      </button>

                      <Modal className='Modal' isOpen={modalIsOpen} onRequestClose={closeModal}>
      	              <h3>Type your Passcode</h3>
                        <input onChange={handlChange}/>
                        <button onClick= {e=>{
                          getPassword();
                          //passwordMatch();
                        }}>Submit</button>
                        <h3>{alertText}</h3>
                        <button onClick={closeModal}>Close</button>
                      </Modal>

                    </div>
                )})
              : null}
            </div>
            
            
          </div>
         
      </div>  
    );
}

 export default Journal;
