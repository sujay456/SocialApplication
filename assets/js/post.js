let start=function(postId)
{
    let createComment=function(postId){
        // let newCommentform =$(`#post-${postId}-comment-form`);
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
                    
                       
                            <a class="delete-comment" href="/comment/delete?id=${c._id}">X</a>
                        
                    
                    
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
    let newCommentform=$(`#post-${postId}-comment-form`);
    createComment(postId);
    
    $(' .delete-comment',postContainer).each(function(){
        console.log($(this));
        deleteComment($(this));
    });
    
    


}





// //     

// // For the notifcation part


// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

// class PostComments{
//     // constructor is used to initialize the instance of the class whenever a new instance is created
//     constructor(postId){
//         this.postId = postId;
//         this.postContainer = $(`#post-${postId}`);
//         this.newCommentForm = $(`#post-${postId}-comment-form`);

//         this.createComment(postId);

//         let self = this;
//         // call for all the existing comments
//         $(' .delete-comment', this.postContainer).each(function(){
//             self.deleteComment($(this));
//         });
//     }


//     createComment(postId){
//         let pSelf = this;
//         this.newCommentForm.submit(function(e){
//             e.preventDefault();
//             let self = this;

//             $.ajax({
//                 type: 'post',
//                 url:`/comment/create?id=${postId}`,
//                 data: $(self).serialize(),
//                 success: function(data){
//                     let newComment = pSelf.newCommentDom(data.data.comment);
//                     $(`#post-comments-${postId}`).prepend(newComment);
//                     pSelf.deleteComment($(' .delete-comment', newComment));

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment published!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();

//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });


//         });
//     }


//     newCommentDom(c){
//         // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
//         return $(`<li id="comment-${ c._id }">
                        
                            
//                             <small>
//                                 <a class="delete-comment-button" href="/comments/destroy/${c._id}">X</a>
//                             </small>
                            
//                             <p>${c.content}</p>
//                              <small>${name}</small>
                           

//                 </li>`);
//     }


//     deleteComment(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#comment-${data.data.comment_id}`).remove();

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment Deleted",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     }
// }