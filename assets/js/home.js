
{
    let createPost=function(){
        let newPostForm=$('#home-post-form');

        newPostForm.submit(function(event){
            event.preventDefault();
            
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(), //this will make sure that in data everything should be in the json format
                success:function(data)
                {
                    let newPost=newPostDom(data.data.post,data.data.username);
                    $('#Post-container>ul').prepend(newPost);
                    notification(data.type,data.text);
                    deletePost($(' .delete-post-button',newPost));
                },error: function(error){
                    console.log("error",error.responseText);
                }
            })
        })
    }

    let notification=function(type,text)
    {
        new Noty({
            theme:'relax',
            text:text,
            type:type,
            layout:'topRight',
            timeout:1500
            
        }).show();
    } 

    let newPostDom=function(post,name)
    {
        return $(`
                <li id="post-${post._id}" >
                    
                                              
                    <div class="Post-Container">
                        
        
                        
                            <small>
                                <a class="delete-post-button" href="/post/delete/${post._id}" >X</a>
                            </small>
                        
                         
                        <p>${post.content}</p>
                        <small>${name}</small>
                    </div>
                    <div class="Comment-container">
        
                        <form action="/comment/create?id=${post._id}" method="post">
                            <input type="text" name="content" placeholder="Add a Comment" required >
                            <input type="submit" value="comment" > 
                        </form>
                    </div>
        
                    <div class="comments-display" >
                        <ul>
                            
                        </ul>
                    </div>
                </li>    
        `);
    }

    let deletePost=function(deleteLink){

       $(deleteLink).click(function(e)
       {
           e.preventDefault();
           $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data)
            {
                console.log(data);
                $(`#post-${data.data.postId}`).remove();
                notification(data.type,data.text);
            },
            error:function(err)
            {
                console.log(err.responseText);
            }
        });
       })
    }

    createPost();

    let alldeleteLinks=$('.delete-post-button');
    for(let i=0;i<alldeleteLinks.length;++i)
    {
        deletePost(alldeleteLinks[i]);
    }
    
}