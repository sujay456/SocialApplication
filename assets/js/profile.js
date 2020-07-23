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
