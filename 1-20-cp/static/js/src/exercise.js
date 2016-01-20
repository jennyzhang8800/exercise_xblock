/**
 * Created with PyCharm.
 * User: zhangyanni
 * Date: 16-1-20
 * Time: 下午5:56
 * To change this template use File | Settings | File Templates.
 */
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
        var jsonObj = eval("(" + result.data + ")"); // 把string转化为json
        //提取出各项信息
        var type=jsonObj["type"];
        var knowledge=jsonObj["knowledge"];
        var degree_of_difficulty=jsonObj["degree_of_difficulty"];
        var explain=jsonObj["explain"];
        var source=jsonObj["source"];
        var answer=jsonObj["answer"];
        var options=jsonObj["options"];
        var question=jsonObj["question"];
        $('#modifyExercise').empty();
        alert("type:"+type+",knowledge:"+knowledge+",degree_of_difficulty:"+degree_of_difficulty+",explain:"+explain+",source:"+source+",answer:"+answer+",options:"+options);
        //定义html模板
        $('#modifyExercise').append('<table width="100%" height="500" border="0" align="center"><form action="" method="post" name="form2"><tr><td ><table width="100%" height="451" border="0"><tr><td width="10%" rowspan="3">&nbsp;</td><td width="80%" height="30">&nbsp;</td><td width="10%" rowspan="3">&nbsp;</td></tr><tr><td height="175" width="100%" valign="top"><table width="100%"  border="0"><tr id="modifyTypeTr"></tr><tr id="modifyDegreeTr"></tr><tr id="modifyKnowledgeTr"></tr><tr id="modifySourceTr"></tr><tr id="modifyQuestionTr"></tr><tr id="modifyOptionsTr"></tr><tr id="modifyAnswerTr"></tr><tr id="modifyExplainTr"></tr></table></td></tr><tr><td valign="tops"><table width="100%" border="0"><tr><td width="33%">&nbsp;</td><td width="20%"><input type="button" id="save" value="SAVE" width="60" height="20"/></td><td width="20%">&nbsp;</td><td width="17%">&nbsp;</td></tr></table> </td> </tr></table></td></tr></form><table>');
        $('#modifyTypeTr').append(' <td width="30%" class="zi"><div align="right">题型：</div></td><td width="70%" align="center"><div align="left" id="modifyType_div"><select id="modifyType"><option value ="single_answer">单项选择题</option><option value ="multi_answer">多项选择题</option><option value="true_false">判断题</option><option value="fill_in_the_blank">填空题</option><option value="question_answer">问答题</option></select></div></td>');
        $('#modifyDegreeTr').append('<td class="zi"><div align="right">难度：</div></td><td><div align="left"><select id="modify_degree_of_difficulty"><option value ="1">1</option><option value ="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div></td>');
        $('#modifyKnowledgeTr').append('<td class="zi"><div align="right" >知识点：</div></td><td><div align="left"><input name="knowledge" type="text" size="40"  id="modifyKnowledge"></div><div class="tips" style="font-size: 10px;color: red"> 知识点之间用逗号隔开</div></td>');
        $('#modifySourceTr').append('<td class="zi"><div align="right">题目来源：</div></td><td><div align="left" ><input name="source" type="text" size="40" id="modifySource"></div></td>');
        $('#modifyQuestionTr').append('<td class="zi"><div align="right">题干：</div></td><td><div align="left" ><input name="question" type="text" size="40" id="modifyQuestion"></div></td>');
        $('#modifyOptionsTr').append('  <td class="zi"  ><div align="right">选项：</div></td><td><div align="left" ><input name="options" type="text" size="40" id="modifyOptions"></div></td>');
        $('#modifyAnswerTr').append('<td class="zi"><div align="right">参考答案：</div></td><td><div align="left" ><input name="right_answer" type="text" size="40" id="modifyAnswer"></div></td>');
        $('#modifyExplainTr').append('<td class="zi"><div align="right">备注：</div></td><td><div align="left" ><input name="memo" type="text" size="40" id="modifyExplain"></div></td>');
        //根据json数据，在模板中填入对应的值
        //设置select的默认选项
        $("#modifyType  option[value="+type+"] ").attr("selected",true);
        $("#modify_degree_of_difficulty  option[value="+degree_of_difficulty+"] ").attr("selected",true);
        //设置其余各项input的值
        $('#modifyKnowledge').val(knowledge);
        $('#modifySource').val(source);
        $('#modifyQuestion').val(question);
        $('#modifyOptions').val(options);
        $('#modifyAnswer').val(answer);
        $('#modifyExplain').val(explain);
        //填空题和问答题没有option选项，删之
        if(type=="fill_in_the_blank"){
            $('#modifyOptionsTr').remove();
        }
        else if(type=="question_answer"){
            $('#modifyOptionsTr').remove();
        }
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
