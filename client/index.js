// console.log("hii")

const socket = io("http://localhost:5050")

const messageBox=document.querySelector(".chatbox form")
const messageList=document.querySelector("#messagelist")
const chatboxinput=document.querySelector(".chatbox input")
const userList=document.querySelector("ul#users")
const useraddform=document.querySelector(".modal")
const backdrop=document.querySelector(".backdrop")
const useraddinput=document.querySelector(".modal input")

let messages=[];
let users=[];
 
//socket list
socket.on("message_client",(message)=>{
    messages.push(message)
    updateMessage()
})

socket.on("users",(_users)=>{
    users=_users;
    updateUsers()
})

// event listeners
messageBox.addEventListener("submit",submitHandler)
useraddform.addEventListener("submit",userAddHandler)

function submitHandler(e){
    e.preventDefault();

     let message=chatboxinput.value;
     
     if(!message){
        return alert("message is empty")
     }
      socket.emit("message",message)
        chatboxinput.value=""
}

function updateMessage(){
    messageList.textContent=""

    for(let i=0;i<messages.length;i++){
        messageList.innerHTML += `
        <li>
         <p>${messages[i].user}</p>
         <p>${messages[i].message}</p>
        </li>
        `
    }
   
}

function userAddHandler(e){
    e.preventDefault();

    let username=useraddinput.value;
    
    if(!username){
        return alert("You must add a user name")
    }
    socket.emit("adduser",username)

    useraddform.classList.add("disappear")
    backdrop.classList.add("disappear")
}

function updateUsers(){
    userList.textContent="";

    for(let i=0;i<users.length;i++){
        let node=document.createElement("LI")
        let textnode=document.createTextNode(users[i]);
        node.appendChild(textnode)
        userList.appendChild(node)

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

