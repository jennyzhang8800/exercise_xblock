/* Javascript for PiazzaFeedXBlock. */
function ExerciseXBlock(runtime, element) {
    $('#navBar td').click(function(){
        $(this).css('background','#528B8B');
        $('#navBar td').not(this).css('background','#79CDCD');
    });
    $('#addNew').click(function(){
        $('#addNewExercise').show();
        $('#modifyExercise').hide();
    });

    $('#Modify').click(function(){
        $('#addNewExercise').hide();
        $('#modifyExercise').show();
    });

    var handlerAddNewExercise = runtime.handlerUrl(element,'addNewExercise');
    var handlerModifyExercise = runtime.handlerUrl(element,'modifyExercise');
    $('#type').change(function(){
        var selected= $('#type').val();
        $("#options").empty();
        if(selected=="single_answer"){
            $("#options").empty();
            $('#options').append('<input type="radio" name="single_answer" value="A" >');
            $('#options').append('<span >A.</span>');
            $('#options').append('<input type="text" id="A"/>');
            $('#options').append('<br/>');
            $('#options').append('<input type="radio" name="single_answer" value="B" >');
            $('#options').append('<span >B.</span>');
            $('#options').append('<input type="text" id="B"/>');
            $('#options').append('<br/>');

            $('#options').append('<input type="radio" name="single_answer" value="C" >');
            $('#options').append('<span >C.</span>');
            $('#options').append('<input type="text" id="C"/>');
            $('#options').append('<br/>');

            $('#options').append('<input type="radio" name="single_answer" value="D" >');
            $('#options').append('<span >D.</span>');
            $('#options').append('<input type="text" id="D"/>');
            $('#options').append('<span id="addOption"  style="font-size:10px; text-align:center"><u>add a new option</u></span>');
            $('#options').append('<br/>');
            $('#optionTr').show();
            $("#answerTr").hide();

        }
        else if(selected=="true_false"){
            $("#options").empty();
            $('#options').append('<input type="radio" name="true_false" value="A" >');
            $('#options').append('<span >A.</span>');
            $('#options').append('<input type="text" id="A"/>');
            $('#options').append('<br/>');

            $('#options').append('<input type="radio" name="true_false" value="B" >');
            $('#options').append('<span >B.</span>');
            $('#options').append('<input type="text" id="B"/>');
            $('#options').append('<br/>');
            $('#optionTr').show();

            $("#answerTr").hide();
        }
        else if(selected=="multi_answer"){
            $('#optionTr').show();
            $("#options").empty();
            $('#options').append('<label><input name="multi_answer" type="checkbox" value="A" />A.<input type="text" id="A"/> </label> ');
            $('#options').append('<br/>');

            $('#options').append('<label><input name="multi_answer" type="checkbox" value="B" />B.<input type="text" id="B"/> </label> ');
            $('#options').append('<br/>');

            $('#options').append('<label><input name="multi_answer" type="checkbox" value="C" />C.<input type="text" id="C"/> </label> ');
            $('#options').append('<br/>');

            $('#options').append('<label><input name="multi_answer" type="checkbox" value="D" />D.<input type="text" id="D"/> </label> ');
            $('#options').append('<span id="addNewMulti" style="font-size: 10px;text-align: center" ><u>add a new option</u></span>');
            $('#options').append('<br/>');
            $("#answerTr").hide();
        }
        else {
            $("#optionTr").hide();
            $('#answerTr').show();
        }
        $('#addOption').click(function(){
            var tr=$("input[name='single_answer']:last").next("span").text();
            var lastChar=tr[0];
            var code=lastChar.charCodeAt();
            var nextChar=String.fromCharCode(code+1);
            var nextCharDot=nextChar+".";
            $('#options').append('<input type="radio" name="single_answer" value='+nextChar+'>');
            $('#options').append('<span></span>');
            $("input[name='single_answer']:last").next("span").text(nextCharDot);
            $('#options').append('<input type="text" id='+nextChar+'>');
            $('#options').append('<br/>');

        });

        $('#addNewMulti').click(function(){
            var lastChar=$("input[name='multi_answer']:last").val();
            var code=lastChar.charCodeAt();
            var nextChar =String.fromCharCode(code+1);
            var nextCharDot=nextChar+".";
            $('#options').append('<label><input name="multi_answer" type="checkbox" value='+nextChar+'>'+nextCharDot + '<input type="text" id='+nextChar+'></label>');
            $('#options').append('<br/>');
        });

    });
    $('#reset',element).click(function(eventObject){
        $("input[type='text']").val("");

    });

    $('#save',element).click(function(eventObject){
        var qType=$("#type").val();
        var result={};
        if (qType=="single_answer"){
            result["options"]=[];
            var right_answer=$("input[name='single_answer']:checked").val();
            if(right_answer==null)
            {
                alert("please choose right answer!");
                return 0;
            }
            else{
                var tr=$("input[name='single_answer']:last").next("span").text();
                var lastChar=tr[0];
                var ASCII_lastChar =lastChar.charCodeAt();
                for(var i=65;i<=ASCII_lastChar ;i++){
                    var Char=String.fromCharCode(i);
                    var text=$("#"+Char).val();
                    var text=Char+"."+text;
                    result["options"].push(text);
                }
                result["answer"]=right_answer;
            }
        }

        else if (qType=="true_false"){
            result["options"]=[];
            var right_answer=$("input[name='true_false']:checked").val();
            if (right_answer==null)
            {
                alert("please choose right_answer");
                return 0;
            }
            else{
                var tr=$("input[name='true_false']:last").next("span").text();
                var lastChar=tr[0];
                var ASCII_lastChar =lastChar.charCodeAt();
                for(var i=65;i<=ASCII_lastChar ;i++){
                    var Char=String.fromCharCode(i);
                    var text=$("#"+Char).val();
                    var text=Char+"."+text;
                    result["options"].push(text);
                }

                result["answer"]=right_answer;
            }
        }

        else if (qType=="multi_answer"){
            result["options"]=[];
            var right_answer="";
            $("input[name='multi_answer']:checked").each(function () {
                right_answer+=this.value;
            });
            if (right_answer=="")
            {
                alert("please input right_answer!");
                return 0;
            }
            else{
                var lastChar=$("input[name='multi_answer']:last").val();

                var ASCII_lastChar =lastChar.charCodeAt();
                for(var i=65;i<=ASCII_lastChar ;i++){
                    var Char=String.fromCharCode(i);
                    var text=$("#"+Char).val();
                    var text=Char+"."+text;
                    result["options"].push(text);
                }
                result["answer"]=right_answer
            }
        }

        else{
            result["answer"]=$(rightAnswer).val();

        }
        result["source"]="";
        result["question"]="";
        result["explain"]="";
        result["degree_of_difficulty"]=$("#degree_of_difficulty").val();
        result["knowledge"]=$("#knowledge").val().split(",");
        result["source"]=$("#source").val();
        result["question"]=$("#question").val();
        result["type"]=$("#type").val();
        result["explain"]=$("#explain").val();
        alert(JSON.stringify(result));

        $("#tips").text("Synchronize with github,please wait about 5s...");
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
    function modifyExerciseCallBack(result){
        alert(result.data);
       
    }

    $("#modify",element).click(function(eventObject){
        var q_number=$('#qNumber').val();
        alert(q_number);
        if(q_number==""){
            alert("please input question number!");
        }
        else{
            if(q_number.substring(q_number.length-2,q_number.length)=="00"){
                var file_dir=Number(q_number.substring(0,q_number.length-2));
            }
            else{
                var file_dir=Number(q_number.substring(0,q_number.length-2))+1;
            }


            var file_dir=file_dir.toString();
            var file_name=q_number+".json"
            alert(file_dir+'/'+file_name);
            $.ajax({
                type:"POST",
                url:handlerModifyExercise,
                data:JSON.stringify({"file_dir":file_dir,"file_name":file_name}),
                success:modifyExerciseCallBack
            });
        }
    });



    $(function ($) {
        /* Here's where you'd do things on page load. */
        $('#modifyExercise').hide();
    });
}
