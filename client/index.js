console.log("hii")

const socket = io("http://localhost:5050")

const messageBox=document.querySelector(".chatbox form")
const messageList=document.querySelector("#messagelist")
const chatboxinput=document.querySelector(".chatbox input")
const userList=document.querySelector("ul#users")

const messages=[]
 
//socket list
socket.on("message_client",(message)=>{
    messages.push(message)
    updateMessage()
})

// event listeners
messageBox.addEventListener("submit",submitHandler)

function submitHandler(e){
    e.preventDefault();

     let message=chatboxinput.value;
     
     if(!message){
        return alert("message is empty")
     }
     else {
        socket.emit("message",message)
        chatboxinput.value=""
     }
}

function updateMessage(){
    messageList.textContent=""

    for(let i=0;i<messages.length;i++){
        messageList.innerHTML += `
        <li>
         <p>${messages[i].message}</p>
        </li>
        `
    }
   
}

// //emit is doing the sending the messages
// //client to server
// socket.emit("ping",{
//     message:"Hi Friend"
// })


// //server to client
// socket.on("message",(data)=>{
//     //console.log(data)
//    console.log(data.message)
// })

