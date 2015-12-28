/* Javascript for PiazzaFeedXBlock. */
function ExerciseXBlock(runtime, element) {
        
    var handlerAddNewExercise = runtime.handlerUrl(element,'addNewExercise');
    $('#type').change(function(){
        var selected= $('#type').val();
        $("#options_div").empty();
        if(selected=="single_answer"||selected=="multi_answer"){
          var label=document.createElement('label');
          label.innerHTML="options:";
           $('#options_div').append(label);
          var input=document.createElement('input');
          input.setAttribute("type","text");
          input.setAttribute("id","options");
          $("#options_div").append(input);
        }
       else if(selected=="true_false"){
          var label=document.createElement('label');                                                   
          label.innerHTML="options:";
           $('#options_div').append(label);
          var input=document.createElement('input');
          input.setAttribute("type","text");
          input.setAttribute("id","options");
          input.setAttribute("class","input");
          $("#options_div").append(input);
        }
    });
    $('#createExercise',element).click(function(eventObject){
        var degree_of_difficulty=$('#degree_of_difficulty').val();
        var type=$('#type').val();
        var knowledge=$('#knowledge').val();
        var source=$('#source').val();
        var question=$('#question').val();
        var answer=$('#answer').val();
        var result={};
        result["type"]=type;
        result["question"]=question;
        result["source"]=source;
        result["answer"]=answer; 
        result["knowledge"]=[];
        var knowledges=knowledge.split(",");
        for(var i=0;i<knowledges.length;i++){
            result["knowledge"].push(knowledges[i]);
        }
        if($('#options').length>0){
           result["options"]=[];
        var option=$("#options").val();
        var options=option.split(",");
        
        for(var i=0;i<options.length;i++){
            result["options"].push(options[i]);
        }
        }        
        str=JSON.stringify(result);
        $("#tips").text("Synchronize with github,please wait about 3s...");
        $.ajax({
            type:"POST",
            url:handlerAddNewExercise,
            data:JSON.stringify(result),
            success:addNewExerciseCallBack
        });
    });
    function addNewExerciseCallBack(result){
      var p=document.createElement("p");
      p.setAttribute("class","pMessage");
      p.innerHTML="synchronize successfully! The 'q_number' is: "+result.q_number;
      $("#message").append(p);
      var p2=document.createElement("p");
      p2.setAttribute("class","pMessage");
      p2.innerHTML="You can check it at:"
      $("#message").append(p2);
      var a=document.createElement('a');
      a.href=result.message;
      a.innerHTML=result.message;
      $("#message").append(a);
      
    }
    function button_fullscreen() {
        var frame = document.getElementById("view");
        if (frame.requestFullscreen) {
            frame.requestFullscreen();
        }
        else if (frame.mozRequestFullScreen) {
            frame.mozRequestFullScreen();
        }
        else if (frame.webkitRequestFullscreen) {
            frame.webkitRequestFullscreen();
        }
    }

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
