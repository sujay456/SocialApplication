// // const e = require("express");

// let start=function(postId)
// {
//     let createComment=function(postId){
//         // let newCommentform =$(`#post-${postId}-comment-form`);
//         newCommentform.submit(function(event){
//             event.preventDefault();
//             let self=this;    
//             $.ajax({
//                 type:'post',
//                 data:$(self).serialize(),
//                 url:$(self).prop('action'),
//                 success:function(data){
//                     console.log(data);
//                     let newComment= newCommentDom(data.data.comment,data.data.username);
//                     $(`#post-comments-${postId}`).prepend(newComment);
                    
//                     notification(data.type,data.text);
                    
                    
//                     console.log($(' .like-comment',newComment));
                    
//                     Like($(' .like-comment',newComment));
                    
//                     deleteComment($(' .delete-comment',postContainer));
//                     },
                    
//                     error:function(err){
//                         console.log(err.responseText);
//                     }
//                 })
//             })
//     }
//     let Like=function(Like)
//     {
//         let LikeButton=$(' .like-button',Like);
//         let LikeNumber=$(' span',Like);

//         console.log("Like button",$(LikeButton));
//         console.log('Like number',$(LikeNumber));
        
//         $(LikeButton).click(function(e)
//         {
//             e.preventDefault();
        
//             $.ajax({
//                 type:'get',
//                 url:$(LikeButton).prop('href'),
//                 success:function(data)
//                 {
//                     console.log(data);
//                     console.log($(LikeNumber));

//                     $(LikeNumber)[0].innerHTML=data.data.numberLikes;
//                 },error:function(err)
//                 {
//                     console.log(err.responseText);
                    
//                 }
//             });
//         });
//     }
//     let newCommentDom=function(c,name){
//                 return (`
//                 <li id="comment-${c._id}" >

//                         <div class="like-comment">
//                             <span>${c.like.length}</span>
//                             <a class="like-button" href="/like/toggle?id=${c._id}&type=Comment">Like</a>
//                         </div>

//                         <small>
//                             <a class="delete-comment" href="/comment/delete?id=${c._id}">X</a>
//                         </small>
                    
                    
//                     <p>${c.content}</p>
//                     <small>${name}</small>
//                 </li>
//             `);
//     }
    
//     let deleteComment=function(deleteLink){
//         console.log('delete-link for new a ',$(deleteLink));
//         $(deleteLink).click(function(event){
//             // console.log('clicked for delete');
//             event.preventDefault();
//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data){
//                     console.log(data);
                    
//                     $(`#comment-${data.data.commentId}`).remove();
//                     notification(data.type,data.text);
//                 },
//                 error:function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })

//     }
//     let notification=function(type,text)
//     {
//         new Noty({
//             theme:'relax',
//             text:text,
//             type:type,
//             layout:'topRight',
//             timeout:1500
            
//         }).show();
//     } 

    
    
//     let postContainer=$(`#post-${postId}`);
//     let newCommentform=$(`#post-${postId}-comment-form`);
    
//     createComment(postId);
    
//     $(' .like-comment',postContainer).each(function()
//     {
//         Like($(this));
//     });

//     $(' .delete-comment',postContainer).each(function(){
//         console.log($(this));
//         deleteComment($(this));
//     });
    
    


// }

class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comment-form`);
        
        this.createComment(postId);
        let self = this;

        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });

    
    }
    createComment(postId)
    {
        let pself=this;
        // console.log(pself);
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self=this;

            $.ajax({
                type:'post',
                url:`/comment/create?id=${postId}`,
                data:$(self).serialize(),
                success: function(data){
                    let newComment=pself.newCommentDom(data.data.comment,data.data.username);

                    $(`#post-comments-${postId}`).prepend(newComment);

                    pself.deleteComment($(' .delete-comment-button', newComment));

                    // notification(data.type,data.text);
                    new ToggleLike($(' .toggle-like-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                },error:function(error)
                {
                    console.log(error.responseText);

                }
            });
        });
    }

    newCommentDom(comment,name)
    {
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comment/delete?id=${comment._id}">X</a>
                            </small>

                            <a class="toggle-like-button" data-likes="0" href="/like/toggle?id=${comment._id}&type=Comment">
                                    0 Likes
                            </a>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${name}
                            </small>
                            

                        </p>    

                </li>`);
    }

    deleteComment(deleteLink)
    {
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data)
                {
                    console.log(data);
                    $(`#comment-${data.data.commentId}`).remove();
                    // notification(data.type,data.text);
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error)
                {
                    console.log(error.responseText);
                }
            });

        });
    }



}