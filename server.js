const express=require('express')
const socket=require("socket.io")

const app=express()


// http module
const http=require('http')
const server=http.createServer(app);

//here is "io" is communication (between server and client i.e., bidirectional process) is established 
const io=socket(server,{
    // to allow client to communicate with server
    //so here we use cors: what type of client can access to server
    cors:{
        origin:"*",  //here any one access the socket server , we can request from anywhere
        methods:["GET","POST"]
    }
})



let PORT=5050;
server.listen(PORT,()=>{
    console.log(`listening on ${PORT} `)
})
//here this "io" is listen to the connection

//here socket parameter is unique to the server

// socket.emit - This method is responsible for sending messages.
// socket.on - This method is responsible for listening for incoming messages.

const users=[];

io.on("connection",(socket)=>{
   console.log('connected to:',socket.id)  //this was in client(browser) side
   
    socket.on("adduser",(username)=>{
            socket.user=username;
            users.push(username)
            io.sockets.emit("users",users)
    })
    socket.on("message",(message)=>{
        // console.log(message)
        io.sockets.emit("message_client",{
            
            message: message,
            user:socket.user
           
        })
    }) 
    socket.on("disconnect",()=>{
        console.log("we are disconnecting:",socket.user)
        if(socket.user){
            users.splice(users.indexOf(socket.user),1)
        }
        io.sockets.emit("users:",users)
        console.log("remaining the users:",users)
    })

//    //here ping is from the client side--> communication between client to server
//    socket.on("ping",(data)=>{
//      console.log(data,": from the ping event in client side")
//    })

//    //server to client
//    io.sockets.emit("message",{
//     message:"how are you"
//    })

})


