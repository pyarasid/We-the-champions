// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://new-champions-63e36-default-rtdb.firebaseio.com/"
}

const app= initializeApp(appSettings)
const database= getDatabase(app)
const commentinDB= ref(database, "commentList")

const inputEl = document.getElementById("input-field")
const btnEl= document.getElementById("btn-publish")
const commentEl= document.getElementById("comment-list")

//With this event listener we are just pushing the input in the database
btnEl.addEventListener("click", function(){

    let commentValue= inputEl.value 

    push(commentinDB, commentValue)

    clearInputField()
   
})

//With this onValue function we pull the values from database as snapshot and then send it to the client
//the append function then renders it on the client side
onValue(commentinDB, function(snapshot){

    let commentArray= Object.values(snapshot.val())

    clearCommentListEl()
    
    for(let i=0; i<commentArray.length; i++){

        let currentComment = commentArray[i]

        appendToCommentEl(currentComment)
    }

})

function clearCommentListEl(){
    commentEl.innerHTML=""
}

function clearInputField(){
    inputEl.value=""
}

function appendToCommentEl(commentValue){

 commentEl.innerHTML+= `<li>${commentValue}</li>`
}