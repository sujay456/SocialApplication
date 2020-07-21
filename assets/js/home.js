

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

                    // Here i will have to give commands so that user can comment on the newly generated post
                    // .....
                    start(data.data.post._id);


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
                    <div class="Comment-container" >
        
                        <form  id="post-${post._id}-comment-form" action="/comment/create?id=${post._id}" method="post">
                            <input type="text" name="content" placeholder="Add a Comment" required >
                            <input type="submit" value="comment" > 
                        </form>
                    </div>
        
                    <div class="comments-display" >
                        <ul id="post-comments-${ post._id }">
                            
                        </ul>
                    </div>
                </li>    
        `);
    }

    let deletePost=function(deleteLink){
        // console.log(deleteLink);
        // console.log($(deleteLink));
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

    // For the existing post to be converted to ajax format
    let convertPostToAjax=function()
    {
        $('#Post-container>ul>li').each(function(){
            let self=$(this);
            let deleteLink=$(' .delete-post-button',self);
            deletePost(deleteLink);
            
            //And here also i have to take care of comment creation after it has been refreshed
            // ....... 

            let postId=self.prop('id').split('-')[1];
            start(postId);

        });
    }
    
    createPost();
    convertPostToAjax();
    
    
}