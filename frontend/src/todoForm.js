import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './App.js';
import './App.css';

function TodoForm() {
    const [todo, setTodo] = useState("");
    //const [todoInput, setTodoInput] = useState("");
    //const todos = [];

    document.addEventListener("DOMContentLoaded", () => {
        const SAVING_MESSAGE = "Saving...";
        const SAVED_MESSAGE = "All changes saved.";
      
        document
          .querySelectorAll(".autosave-message")
          .forEach((el) => (el.textContent = SAVED_MESSAGE));
      
        document.querySelectorAll("[data-autosave-value]").forEach((inputField) => {
          inputField.addEventListener("change", async () => {
            const name = inputField.getAttribute("name");
            const value = inputField.value;
            const autosaveMessageEl = inputField
              .closest(".container")
              .querySelector(".autosave-message");
            const formData = new FormData();
      
            formData.append(name, value);
            autosaveMessageEl.classList.add("autosave-message--saving");
            autosaveMessageEl.textContent = SAVING_MESSAGE;
      
            const response = await fetch(value, {
              method: "POST",
              body: formData
            });
      
            autosaveMessageEl.classList.remove("autosave-message--saving");
            autosaveMessageEl.textContent = SAVED_MESSAGE;
          });
        });
      }); 

    const submitTodo = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <main>
                <form onSubmit = {submitTodo}>
                    <label for = "todo">Checklist Title:</label>
                    <input
                    id= "todo" 
                    type = "text"
                    name = "text"
                    onChange = {event => setTodo(event.target.value)}
                    />
                    <input type = "submit" value = "submit" />
                </form>
            </main>
            <span classname = 'bold'>Checklist Entry:</span>
            <Editor
                //editorState = {editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{ width: 500, height: 300, border: "1px solid black" }}
                //onEditorStateChange = {this.onEditorStateChange}      
        />
        <button>submit</button>
        </div> 
    )  
 } 

export default TodoForm;
