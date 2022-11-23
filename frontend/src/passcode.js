import './App.css';
import Modal from 'react-modal'; //this is for popup
import {useState} from 'react';
import React from 'react';

function Passcode(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [alertText, setAlertText] = useState("");
    
    const closeModal = () => {
        setModalIsOpen(false);

    };
    const openModal = () => {
        setModalIsOpen(true);
    };

    const handlChange = (e) => {
        setPasscode(e.target.value);
    };

    const onClickSubmit = () => {
        const textbox = {
          inText: JSON.stringify({passcode}),
        };
        fetch("http://localhost:3307/passcode", { 
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

    return (
        <div>
            <button className='headerbtn' onClick={openModal}>
                <span className="material-symbols-outlined">pin</span> 
            </button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      	        <h3>Your new Passcode</h3>
                <input
                    onChange={handlChange}
                />
                <button onClick={onClickSubmit}>Submit</button>
                <h4>{alertText}</h4>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    )
    
}
export default Passcode;

