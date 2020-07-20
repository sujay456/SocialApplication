{
    let commentForm=$('.comment-form');

    let createComment=function(form){

        // console.log('hello');
        form.submit(function(e)
        {
            e.preventDefault();

            $.ajax({
                type:'post',
                url:form.prop('action'),
                data:form.serialize(),
                success:function(data)
                {   
                    console.log(data);
                    let newComment=commentDisplay(data.data.comment,data.data.username);
                    $('.comments-display>ul').append(newComment);

                },
                error:function(error)
                {
                    console.log("error",error.responseText);

                }
            })
        })
    }

    let commentDisplay=function(c,name){
        return $(`
        <li>
            
                <small>
                    <a href="/comment/delete?id=${c._id}">X</a>
                </small>
            
            
            <p> ${c.content}</p>
            <small>${name}</small>
    </li>`
    );
    }

    // console.log('size',commentForm.length);
    for(let i=0;i<commentForm.length;++i)
    {
        createComment(commentForm.eq(i));
    }
    // console.log('hello');
}