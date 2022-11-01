import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import todo from './todo.js';
import Passcode from './passcode.js';
import Notification from './notification.js';
import TodoForm from './todoForm.js';
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


function todoForm(){
   return(
     <TodoForm/>
  )
}

function Todo(){
  return(
    <todo/>
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

function App() {
  const [date, setDate] = useState(new Date());
  const [todoInput, setTodoInput] = useState(""); 
  const [journalInput, setJournalInput] = useState("");
  //const [todoTagInput, setTodoTagInput] = useState("");
  //const [journalTagInput, setJournalTagInput] = useState("");

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

            <Notification />{/* function above called NotificationApp is here*/}
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

      <div className='belowpart'>
        <div className='todo'> {/*todobox, placeholder shows selected date*/}
          <Todo classname = 'todo'/>
          <TodoForm classname = 'TodoForm'/>
          {/*<input
            value={todoInput} ////onclickday will empty todo input!
            type="text"
            placeholder={date.toDateString()}
            onChange={event => 
              setTodoInput(event.target.value) 
          }
        />
        <button>submit</button> */}
        </div>
        <span className = 'bold'>Journal:</span>{''}
        <Journal className = 'journal'/>
      </div>
    </div>
  );
}

export default App;
