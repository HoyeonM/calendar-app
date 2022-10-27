import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Checklist from './Checklist.js';
import Passcode from './passcode.js';
import Notification from './notification.js';
import JournalForm from './journal.js';


function SearchBar() { 
  //search bar function: <input> makes input box with place holder "search tag", <button> makes submit button
  return (
    <div className='search-bar'>
      <input 
        type="text"
        placeholder="Search Tag"
      />
      <button type="submit" > 
        <span className='search-btn'>Search</span>
      </button>
    </div>
  )
}


function ChecklistApp(){
   return(
     <Checklist/>
   )
}

function StatusApp(){

}

function TagApp(){

}

function Journal() {
  return(
    <JournalForm/>
  )
}

// function NotificationApp(){
//   return(
//     <Notification/> //notification.js has symbol
//   )
// }

function App() {
  const [date, setDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState(""); 
  const [journalInput, setJournalInput] = useState("");
  

  const reset = () => {
    setTodoInput("");
    setJournalInput("");
  } //empty todo and journal input


  return ( //this makes whole UI like html
    <div className='app'>
      <div className='header'>
        <h1 className='text-center'>Daily Life</h1>
        <div className='header-props'>
          <div className='passcode'>
            <Passcode /> {/* function above called PasscodeApp is here*/}
          </div>
          <div className='notification'>
            <Notification /> {/* function above called NotificationApp is here*/}
          </div>
          <SearchBar/> {/* function above called SearchBar is here*/}
        </div>
      </div>
      <div className='calendar-container'>
        <Calendar 
          onChange={setDate} 
          value={date} 
          onClickDay={reset} //everytime I click different date, input will be reset
        />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>

      <div className='_journal'>
          <Journal className = 'journal'/>
      </div>
    </div>
  );
}


export default App;
