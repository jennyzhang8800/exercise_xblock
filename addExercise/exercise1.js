/**
 * Created with PyCharm.
 * User: zhangyanni
 * Date: 16-1-7
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    $("#addNew").click (function (){alert("1111");});
    $("#type").change(function(){
        var selected=$("#type").val();
        //单选题 黰认有4个选项
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
            $('#options').append('<span id="addOption"  style="font-size:8px; text-align:center">添加更多选项</span>');
            $('#options').append('<br/>');
            $("#answerTr").remove();

        }

        //判断题 只有两个选项。
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

            $("#answerTr").remove();
        }

        //多选题
        else if(selected=="multi_answer"){
            $("#options").empty();
            //默认有四个选项
            $('#options').append('<label><input name="multi_answer" type="checkbox" value="A" />A.<input type="text" id="A"/> </label> ');
            $('#options').append('<br/>');

            $('#options').append('<label><input name="multi_answer" type="checkbox" value="B" />B.<input type="text" id="B"/> </label> ');
            $('#options').append('<br/>');

            $('#options').append('<label><input name="multi_answer" type="checkbox" value="C" />C.<input type="text" id="C"/> </label> ');
            $('#options').append('<br/>');

            $('#options').append('<label><input name="multi_answer" type="checkbox" value="D" />D.<input type="text" id="D"/> </label> ');
            $('#options').append('<span id="addNewMulti" style="font-size: 8px;text-align: center" >添加新选项</sapn>');
            $('#options').append('<br/>');

            $("#answerTr").remove();
        }
        //填空题和问答题
        else {
            $("#optionTr").remove();
        }


        $("#addNewMulti").click(function(){
            //获得已有选项的最后一项的字母编号
            var lastChar=$("input[name='multi_answer']:last").val();
            //字母的ASCII
            var code =lastChar.charCodeAt();
            //ASCII加1，并转化为字符
            var nextChar=String.fromCharCode(code+1);
            var nextCharDot=nextChar+".";
            $('#options').append('<label><input name="multi_answer" type="checkbox" value='+nextChar+' />'+nextCharDot +'<input type="text" id='+nextChar +'> </label> ');
            $('#options').append('<br/>');



        });


            //添加更多的选项
        $("#addOption").click(function(){
           //获得已有选项的最后一项的字母编号
            var tr=$("input[name='single_answer']:last").next("span").text();
            var lastChar=tr[0];
            //字母的ASCII
            var code =lastChar.charCodeAt();
            //ASCII加1，并转化为字符
            var nextChar=String.fromCharCode(code+1);
            var nextCharDot=nextChar+".";
            //添加新选项
            $('#options').append('<input type="radio" name="single_answer" value='+nextChar+'>');
            $('#options').append('<span ></span>');
            $("input[name='single_answer']:last").next("span").text(nextCharDot);
            $('#options').append('<input type="text" id='+nextChar+'>');
            $('#options').append('<br/>');


        });

    });

    //点击保存按钮
    $("#submit").click(function(){
        var qType=$("#type").val();
        var result={};

        //单选题
        if (qType=="single_answer"){
            result["options"]=[];
            //radio的选中项为正确答案
            var right_answer=$("input[name='single_answer']:checked").val();
            //正确答案不能为空
            if (right_answer==null)
            {
                alert("请选择正确答案！");
                return 0;
            }
            else{
                //获得最后一个选项的字母编号
                var tr=$("input[name='single_answer']:last").next("span").text();
                var lastChar=tr[0];
                //把字符转化为ASCII
                var ASCII_lastChar =lastChar.charCodeAt();

                //遍历所有的选项
                for(var i=65;i<=ASCII_lastChar ;i++){
                    var Char=String.fromCharCode(i);
                    var text=$("#"+Char).val();
                    var text=Char+"."+text;
                    result["options"].push(text);
                }
                alert(result["options"]);
                //正确答案
                result["answer"]=right_answer;

            }
        }

        else if (qType=="true_false"){
            result["options"]=[];
            //radio的选中项为正确答案
            var right_answer=$("input[name='true_false']:checked").val();
            //正确答案不能为空
            if (right_answer==null)
            {
                alert("请选择正确答案！");
                return 0;
            }
            else{
                //获得最后一个选项的字母编号
                var tr=$("input[name='true_false']:last").next("span").text();
                var lastChar=tr[0];
                //把字符转化为ASCII
                var ASCII_lastChar =lastChar.charCodeAt();

                //遍历所有的选项
                for(var i=65;i<=ASCII_lastChar ;i++){
                    var Char=String.fromCharCode(i);
                    var text=$("#"+Char).val();
                    var text=Char+"."+text;
                    result["options"].push(text);
                }
                alert(result["options"]);
                //正确答案
                result["answer"]=right_answer;

            }
        }

        //多选题
        else if (qType=="multi_answer"){
            result["options"]=[];
            //获取checkbox的选中项为正确答案
            var right_answer="";
           $("input[name='multi_answer']:checked").each(function () {
                right_answer+=this.value;
            });
            alert(right_answer);
            //正确答案不能为空
            if (right_answer=="")
            {
                alert("请选择正确答案！");
                return 0;
            }
            else{
                //获得最后一个选项的字母编号
                var lastChar=$("input[name='multi_answer']:last").val();

                //把字符转化为ASCII
                var ASCII_lastChar =lastChar.charCodeAt();

                //遍历所有的选项
                for(var i=65;i<=ASCII_lastChar ;i++){
                    var Char=String.fromCharCode(i);
                    var text=$("#"+Char).val();
                    var text=Char+"."+text;
                    result["options"].push(text);
                }
                alert(result["options"]);
                //正确答案
                result["answer"]=right_answer;

            }
        }
        else{

            result["answer"]=$("#rightAnswer").val();
            alert(result["answer"]);
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





    });


});
