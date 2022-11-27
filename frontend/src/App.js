import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Passcode from './passcode.js';
import Journal from './journal.js';
import Tag from './Tag.js';
import TodoForm from './TodoForm';


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



function App() {
  const [date, setDate] = useState(new Date());
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
          <div className='search-bar'>
            <SearchBar/> {/* function above called SearchBar is here*/}
          </div>
          <div className='tag-bar'>
            <Tag/>
          </div>
          
          <SearchBar/> {/* function above called SearchBar is here*/}
        </div>
      </div>
      <div className='calendar-container'>
        <Calendar 
          onChange={setDate} 
          value={date} 
        />
      </div>
      <div className= '_todo'>
        <span className = 'bold'>Checklist:</span>{''}
        <TodoForm/>
      </div>
      <div className='_journal'>
        <span className = 'bold'>Journal</span>{''}
        <Journal />
      </div>
    </div>
  );
}

export default App;
