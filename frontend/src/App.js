import { useState } from 'react';
import './App.css';
import Passcode from './passcode.js';
import Journal from './journal.js';
import TodoForm from './todoForm';


function clickedSubmit(){
  let input = document.getElementById('myInput').value
  window.find(input)
}

function SearchBar() { 
  //search bar function: <input> makes input box with place holder "search tag", <button> makes submit button
  return (
    <div className='search-bar'>
      <input type="text" id="myInput" placeholder="Search for notes.."></input>
      <button type="submit" onClick={clickedSubmit} > 
        <span className='search-btn'>Search</span>
      </button>
    </div>
  )
}

function App() {
  return ( //this makes whole UI like html
    <div className='app'>
      <div className='header'>
        <h1 className='text-center'>Daily Life</h1>
        <div className='header-props'>
          <div className='passcode'>
            <Passcode /> {/* function above called PasscodeApp is here*/}
          </div>
          <SearchBar/> {/* function above called SearchBar is here*/}
        </div>
      </div>
      <div className= '_todo'>
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
