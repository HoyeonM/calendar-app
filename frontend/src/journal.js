import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';
import './App.css';
import React from 'react';
import Modal from 'react-modal'; //this is for popup


//선택된 인덱스의 아이디 불러오기..

function Journal() {
    let currentId = 0;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const [dateTime, setDate] = useState("");
    const [id,setID] = useState(0);
    const [notesArray, setNotesArray] = useState([]);
    const [showNotes, setShowNotes] = useState(false);

    // var buttonText = showNotes ? "Hide Notes" : "Show Notes";

    const getNotes = () => {
      Axios.get("http://localhost:3306/getNotes").then((res) => {
        setNotesArray(res.data);
        console.log(res.data);
      })
    }

    const closeModal = () => {
      setModalIsOpen(false);

  };
  const openModal = () => {
      setModalIsOpen(true);
  };

    const manageshowAllNotes = () => {
      setShowNotes(!showNotes);
    }

    const hideAllNotes = () => {
      setShowNotes(false);
    }

   const emptyInput = () =>{
    setTitle("");
    setNote("");
   }
    
   const addNote = () => {
      Axios.post("http://localhost:3306/insert", {
        title: title, 
        note: note, 
        dateTime: dateTime,
      })
     .then(res => {
        console.log("Successful note add!");
        window.alert("your note is successfully added!");
        //console.log(res.data);
      
      })
   }

   const updateNote = () =>{
    Axios.put("http://localhost:3306/update", { 
       title: title, 
       note: note, 
       dateTime: dateTime,
   }).then(() => {
       console.log("Edits updated successful");
   });
 }

   const deleteNote = (title) => {
      console.log(title);
      let answer = window.confirm("Are you sure want to delete?");
        if (answer) {
          Axios.delete("http://localhost:3306/delete", {
            title:title
          })
          .then(res => {
            console.log(res);
            console.log(res.data);
            setNotesArray(
                notesArray.filter((item) => {
                    return item.title != title;
                })
            )
          });
        }
    }

    const onClickSubmit = () => {
      const textbox = {
        inText: JSON.stringify({passcode}),
      };
      fetch("http://localhost:3306/passcode", { 
        method: "post", 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(textbox), //sending textbox object
      })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAlertText(json.text);
      });
  };


    const hideNotes = (title) => {
      console.log(title);
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      	        <h3>Type Your Passcode</h3>
                <input
                    onChange={handlChange}
                />
                <button onClick={onClickSubmit}>Submit</button>
                <button onClick={closeModal}>Close</button>
            </Modal>
    }
    const setCurrentView = (id) =>{
      setTitle(notesArray[id].title);
      setNote(notesArray[id].body);
      // document.getElementById('up').onclick = function() {
      //   updateNote(currentId);
      //  }
    }

    const handleClick = event => {
      console.log(event.target.id);
      console.log('div clicked');
  
    };

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
            <button onClick={() => {
              addNote();
              emptyInput();
            }}
            class="journal__add" type="button">Add Note</button>
            <button onClick={updateNote} class="journal__update" type="button">Update Note</button>


            <button onClick={() => {
              manageshowAllNotes();
              getNotes();
              }}
              class="journal__getNote" type="button"> Show All Notes
              </button>
              {/* {showNotes ? getNotes() : null} */}

              <button onClick={()=> {
                // manageshowAllNotes();
              }}
              >Hide All Notes</button>

              <div className='notes'>
                {notesArray.map((notes,index) => {
                  return (
                    <div key={index}>
                      <p className='notes_content'> Title: {notes.title}</p>
                      <p className='notes_content'> Body: {notes.body}</p>
                      <p className='notes_content'> Time Added: {notes.dateTime}</p>
                      
                      <button className="notes_btn" onClick={e=> {
                        handleClick(e, index);
                        deleteNote(notes.title);
                      }}>Delete</button>

                      <button onClick={e=>{
                        handleClick(e,index);
                        hideNotes(notes.title);
                      }}
                      className='notes_btn'>Hide</button>
                    </div>

                ); 
            })}
            {/* {showNotes ? getNotes() : null} */}
            </div>
            {/* {showNotes ? getNotes() : null} */}
         </div> 
         }
      </div>  
    );
 }

 export default Journal;
