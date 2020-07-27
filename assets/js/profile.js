    let count=0;
    let loadFile = function(event) {
                       
        if(count==0)
        {
        $('#preview').append('<h3>Preview</h3>');
        count++;
        }        
        var output = document.getElementById('output');

        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
        $('#preview').append(output);
      };

      console.log('hi');
      $('#FriendRequest').click(function(e){
        e.preventDefault();

        $.ajax({
          type:'get',
          url:$(this).prop('href'),
          success:function(data)
          {
            console.log(data);
            console.log($('#FriendRequest'));

            if(data.type==1)
            {
              $('#FriendRequest')[0].innerHTML='Remove from Friend';
            }else
            { 
              $('#FriendRequest')[0].innerHTML='Add Friend';

            }
          }
          ,error:function(err)
          {
            console.log('err',err);
          }
        });
      });
