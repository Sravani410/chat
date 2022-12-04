console.log("hii")

const socket = io("http://localhost:5050")

//emit is doing the sending the messages
//client to server
socket.emit("ping",{
    message:"Hi Friend"
})


//server to client
socket.on("message",(data)=>{
    //console.log(data)
   console.log(data.message)
})

