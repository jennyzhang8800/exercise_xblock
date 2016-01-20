/**
 * Created with PyCharm.
 * User: zhangyanni
 * Date: 16-1-20
 * Time: 下午5:36
 * To change this template use File | Settings | File Templates.
 */
function modifyExerciseCallBack (result){
    var jsonObj = eval("(" + data + ")"); // 把string转化为json
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