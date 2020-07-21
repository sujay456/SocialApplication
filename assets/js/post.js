let start=function(postId)
{
    let createComment=function(postId){
        let newCommentform =$(`#post-${postId}-comment-form`);
        newCommentform.submit(function(event){
            event.preventDefault();
            
            $.ajax({
                type:'post',
                            data:newCommentform.serialize(),
                            url:$(newCommentform).prop('action'),
                            success:function(data){
                                console.log(data);
                                let newComment= newCommentDom(data.data.comment,data.data.username);
                                $(`#post-comments-${postId}`).prepend(newComment);
                                notification(data.type,data.text);
                                deleteComment($(' .delete-comment',newComment));
                            },
                            error:function(err){
                                console.log(err.responseText);
                            }
                        })
                    })
    }
    let newCommentDom=function(c,name){
                return (`
                <li id="comment-${c._id}" >
                    
                        <small>
                            <a class="delete-comment" href="/comment/delete?id=${c._id}">X</a>
                        </small>
                    
                    
                    <p>${c.content}</p>
                    <small>${name}</small>
                </li>
            `);
    }
    
    let deleteComment=function(deleteLink){
        console.log('delete-link for new a ',$(deleteLink));
        $(deleteLink).click(function(event){
            // console.log('clicked for delete');
            event.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    
                    $(`#comment-${data.data.commentId}`).remove();
                    notification(data.type,data.text);
                },
                error:function(error){
                    console.log(error.responseText);
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

    let postContainer=$(`#post-${postId}`);

    createComment(postId);
    
    $(' .delete-comment',postContainer).each(function(){
        console.log($(this));
        deleteComment($(this));
    });
    
    


}





//     

// For the notifcation part


