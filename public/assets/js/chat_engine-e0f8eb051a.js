class ChatEngine{constructor(e,s,n){this.chatbox=$("#"+e),this.userEmail=s,this.username=n,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("Connection established using sockets... js"),e.socket.emit("join_room",{chatroom:"benends_room",user_email:e.userEmail}),e.socket.on("user_joined",(function(e){console.log("user joined",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,username:e.username,chatroom:"benends_room"})})),e.socket.on("receive_message",(function(s){console.log("mesagge recieved",s);let n=$("<li>"),o="other-message";s.user_email==e.userEmail&&(o="self-message"),n.append($("<span>",{html:s.message})),n.append($("<sub>",{html:s.username})),n.addClass(o),$("#chat-messages-list").append(n)}))}}