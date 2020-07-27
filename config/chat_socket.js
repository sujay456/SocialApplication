module.exports.chatSocket=function(socketServer)
{
    // This is the recieving  end or the observer
    // And the one we created earlier in js folder is subscriber
    
    let io=require('socket.io')(socketServer);

    io.sockets.on('connection',function(sockets){
        console.log('New connection',sockets.id);
        
        sockets.on('disconnect',function(){
            console.log('Network disconnected');
        });

        sockets.on('join_room',function(data){
            console.log('The request to join_room recieved',data);

            sockets.join(data.chatroom);
            // Here we are using .in why?
            // Because we first will go into the chat room and emit 
            // we don't this message to be sent to everyone but to them
            // who are there in the chat room

            io.in(data.chatroom).emit('user_joined',data);
            
        });

        sockets.on('send_message', function(data){
            // console.log('hello');
            io.in(data.chatroom).emit('receive_message', data);
        });
    })
}