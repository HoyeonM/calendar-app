# Dailylife Todo - Web Application

#### 🔥 Skill 🔥
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/>  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>

#### 🔎 Tool 🔎
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/phpMyAdmin-6C78AF?style=flat-square&logo=phpmyadmin&logoColor=white"/> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>

#### 📓 Description 📓
This is a Todo web application called Daily Life, running in localhost. Default view will be calendar, todo box and note(journal) box.
Each Todo box is corresponded to the date that user picks. Todos and Notes will be saved to the database.
User can create password and this can be used to hide/show notes. User can change password, and the latest added password to the database will become 'real' user password. Search function basically work same as Ctrl+F.


#### Functionalities

**1. Calendar**<br/>
   Used [Calendar API](https://www.npmjs.com/package/react-calendar)
   Selected date is marked as blue, Current date is yellow.
   <img width="600" alt="Screen Shot 2022-12-22 at 4 43 48 AM" src="https://user-images.githubusercontent.com/99692392/209137189-c017381d-f54e-4ef8-81b0-6f17605f8f37.png"> <br/>
   

**2. Pin**<br/>
  Used [Modal API](https://www.npmjs.com/package/react-modal)
  ```javascript
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
        .then((json) => {
          console.log(json);
          closeModal();
        });
   ```
   <img width="600" alt="Screen Shot 2022-12-22 at 4 56 06 AM" src="https://user-images.githubusercontent.com/99692392/209138996-804544d0-63cd-45b8-be3a-04efe05a2523.png"> <br/>
   

**3. Search**<br/>
   ```javascript
   function clickedSubmit(){
      let input = document.getElementById('myInput').value
      window.find(input)
   }
   ```
   <img width="200" alt="Screen Shot 2022-12-22 at 5 10 59 AM" src="https://user-images.githubusercontent.com/99692392/209141527-68cc6a41-140c-468c-9bd3-26c3f5b45386.png">
<img width="300" alt="Screen Shot 2022-12-22 at 5 10 55 AM" src="https://user-images.githubusercontent.com/99692392/209141539-a1b7966e-effc-4488-a5f2-c46a10d0f618.png"> <br/>


**4. Checklist**<br/>
   Used map , pass index to functions
   add Todo : post
   delete Todo : delete
   complete Todo : put -> update status
<img width="600" alt="Screen Shot 2022-12-22 at 5 17 02 AM" src="https://user-images.githubusercontent.com/99692392/209142511-d9b2f232-c290-4afb-8be6-f2a66cfa7556.png"> <br/>


**5. Journal**<br/>
   Used map ,  pass index to functions
   Show All Notes: get all notes by Axios.get() then setNotesArray(res.data) / Hide All Notes: setNotesArray(null);
   Add Note: post / reload window to show all notes..
   <img width="600" alt="Screen Shot 2022-12-22 at 5 40 46 AM" src="https://user-images.githubusercontent.com/99692392/209147094-f5826331-ed4e-4467-8216-854eec2563aa.png"> <br/>
   
   - Delete <br/>
   show confirm window(window.confirm) <br/>
   <img width="200" alt="Screen Shot 2022-12-22 at 5 41 40 AM" src="https://user-images.githubusercontent.com/99692392/209147620-e0a51c5d-cb19-458d-9e85-a10509029d09.png"> <br/>
   
   - Hide/Show <br/>
   hide function will blur contents(style.filter = "blur(5px)";) <br/>
   get password:get , then compare with entered password. If match, hide/show contents, else, window.alert("retry"); <br/>
   <img width="200" alt="Screen Shot 2022-12-22 at 5 41 31 AM" src="https://user-images.githubusercontent.com/99692392/209147694-9bde58d7-1fed-4ef3-a3f9-8bb6d3aadd01.png">


   





