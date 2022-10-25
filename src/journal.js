import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function JournalForm() {
    const [journalInput, setJournalInput] = useState("");
    return (
        <div>
             <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          wrapperStyle={{ width: 500, height: 300, border: "1px solid black" }}
          
       />
       <button>submit</button>
       {/* <input
          value={journalInput} ////onclickday will empty todo input!
          type="text"
          //placeholder="Type tags, comma separated"
          onChange={event => 
            setJournalInput(event.target.value) 
          }
        /> */}
       
        </div>
       
    );
 }

 export default JournalForm;