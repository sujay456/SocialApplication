class ChatEngine{
    constructor(chatboxId,userEmail,username)
    {
        this.chatbox=$(`#${chatboxId}`);
        this.userEmail=userEmail;
        this.username=username;

        this.socket=io.connect('http://localhost:5000');

        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler()
    {
        let self=this;
        this.socket.on('connect',function(){
            console.log('Connection established using sockets... js');
            
            self.socket.emit('join_room',{
                chatroom:'benends_room',
                user_email:self.userEmail
            });

            self.socket.on('user_joined',function(data)
            {
                console.log('user joined',data);
            });
        
        });
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            // console.log('hi');
            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    username:self.username,
                    chatroom: 'benends_room'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('mesagge recieved',data);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            
            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.username
            }));
            

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);


        })
        
    }

}