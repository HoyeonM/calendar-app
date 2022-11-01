//import { useState } from 'react';
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './App.js';
import './App.css';

 var userInput = {title:"", entry:"", subEntry:"", date:""};

class Todo
{
    constructor(title, entry, subEntry, date)
    {
        this.title = title;
        this.entry = entry;
        this.subEntry = subEntry;
        this.date = date;
    }

    //get title value
    getTitle = () => {
        document.getElementById("title");
        return this.title;
    };

    //get entry value
    getEntry = () => {
        document.getElementById("entry");
        return this.entry;
    };

    //get date value
    getDate = () => {
        document.getElementById("date");
        return this.date;
    }

    //print out users input
    displayInput()
    {
        var output = "";
        for (var i = 0; i < userInput.length; i++)
        {
            output += userInput[i];
        }
        document.getElementById("output").innerHTML = output;
    }

    //delete checklist
    deleteTodo(userInput)
    {
        delete userInput.title;
        delete userInput.entry;
        delete userInput.date;
    }

    //delete users subentry
    deleteSubEntry(userInput)
    {
        delete userInput.subEntry;
    }

    //displayInput();
}

export default Todo;
