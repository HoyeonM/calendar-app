import "./App.css";
import {useState} from 'react';
import React from 'react';

function tag(){

    const [tag, setTag] = useState("");
    const [alertText, setAlertText] = useState("");

    const handlChange = (e) => {
        setTag(e.target.value);
    }

    const onClickSubmit = () => {
        const textbox = {
            inText: JSON.stringify({tag})
        };
        fetch("http://localhost:3306/tag", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(textbox),
        })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setAlertText(json.text);
        });
    }

    function dropdownFunction(){
        document.getElementById("dropdown").classList.toggle("show");
    }

    function populateOptions(){
        document.getElementById("dropdownList")
    }
    
    return (
        <div className='tag-UI'>
            <div className='input-bar'>
                <input 
                    type="text"
                    placeholder="Create New Tag"
                    onChange={handlChange}
                />
                <button type="submit" onClick={onClickSubmit}>
                    <h4>{alertText}</h4> 
                    <span className='tag-btn'>Create</span>
                </button>
            </div>
            <div classname='dropdown-bar'>
                <div id="dropdown" class="dropdown-content">
                    <select name="dropdownList">
                        <option value="Tag 1" selected>Dropdown Test Tag 1</option>
                        <option value="Tag 2" selected>Dropdown Test Tag 2</option>
                    </select>
                </div>
            </div>
        </div>
      )
}


//A tag is a short descriptor added to a checklist or journal to allow the user to search for relevant items.
//Has a name.

class Tag{
    constructor(name, color){
        this.name = name;
        this.color = color;
    }

    getName = () => {
        return this.name;
    }

    getColor = () => {
        return this.color;
    }

    //TODO: figure out how to apply a tag to objects.
    //TODO: figure out how to track which objects have which tags.
}

export default tag