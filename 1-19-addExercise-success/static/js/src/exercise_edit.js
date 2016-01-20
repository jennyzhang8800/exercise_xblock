/* Javascript for PiazzaFeedXBlock. */
function ExerciseXBlock(runtime, element) {
    function addOldExercise(result){
                 alert(result.data);
        var div_OldExercise=document.getElementById("OldExercise");
        div_OldExercise.innerHTML="";
        var div_q_type=document.createElement("div");
        div_q_type.setAttribute("class","innerdiv");
        div_q_type.setAttribute("id","qType");
        div_OldExercise.appendChild(div_q_type);
        var label_q_type=document.createElement("label");
        label_q_type.setAttribute("class","label");
        label_q_type.innerHTML="Type of exercise: ";
        div_q_type.appendChild(label_q_type);
        
        var select_element=document.createElement("select");
        select_element.setAttribute("id","Select");
        select_element.setAttribute("class","select");
        select_element.setAttribute("style","height:30px");
        var opt=new Option("please select","please select");
        select_element.options.add(opt);
        for (var i in result.data)
        {
            var opt = new Option(result.data[i],result.data[i]);
            select_element.options.add(opt);
        }
        select_element.addEventListener("change",function(){return clickSelect.apply(this,[this.value]);});
        div_q_type.appendChild(select_element);
    }

    function clickSelect(value){
     alert(value);
         $.ajax({
            type:"POST",
            url:handlerGetQList,                                                                                          
            data:JSON.stringify({"data":value}),
            success:genQList                                                                                              
        });
        
    }
    function genQList(result){
        alert(result.data);
        var div_OldExercise=document.getElementById("OldExercise");
        $('#qType').nextAll().remove();
        var div_q_list = document.createElement("div");
        div_q_list.setAttribute("class","innerdiv");
        div_OldExercise.appendChild(div_q_list);
        var label_q_type=document.createElement("label");
        label_q_type.setAttribute("class","label");
        label_q_type.innerHTML="Number of exercise: ";
        div_q_list.appendChild(label_q_type);
        var select_element=document.createElement("select");
        select_element.setAttribute("class","select")
        select_element.setAttribute("id",result.qType);
        select_element.setAttribute("style","height:30px");
        var opt=new Option("please select","please select");
        select_element.options.add(opt);                                                                                                             
        for (var i in result.data)
        {
            var opt = new Option(result.data[i],result.data[i]);
            select_element.options.add(opt);                                                                                                         
        }
        select_element.addEventListener("change",function(){return clickQList.apply(this,[this.value,result.qType]);});
        div_q_list.appendChild(select_element);        
        
    }
   
    function clickQList(value,qType){
        alert(value);
        alert(qType);
        $.ajax({
            type:"POST",
            url:handlerClickQList,                                                                                                               
            data:JSON.stringify({"value":value,"qType":qType}),
            success:genExercise                                                                                                                   
        });
    }
    function genExercise(result){
        alert(result.data);
        var div_OldExercise=document.getElementById("OldExercise");
        var div_submit_times = document.createElement("div");
        div_submit_times.setAttribute("class","innerdiv");
        div_OldExercise.appendChild(div_submit_times);                                                                       
        var label_q_type=document.createElement("label");
        label_q_type.setAttribute("class","label");
        label_q_type.innerHTML="Submit times limit: ";
        div_submit_times.appendChild(label_q_type);    
         
        var input_times=document.createElement("input");
        input_times.setAttribute("type","text");
        input_times.setAttribute("class","input-text");
        input_times.setAttribute("id","submitTimes");
        input_times.setAttribute("value","3");
        div_submit_times.appendChild(input_times)
        
        var div_gen_exercise=document.createElement("div");
        div_gen_exercise.setAttribute("class","innerdiv");
        div_OldExercise.appendChild(div_gen_exercise);
   

    }

    function genExerciseCallBack(result){
       alert(result.data)
    }
    var handlerClickQList = runtime.handlerUrl(element,'readFile');
    var handlerGetQList = runtime.handlerUrl(element,'getQList');
    var handlerAddOldExercise = runtime.handlerUrl(element,'addOldExercise');
    var handlerGenExercise=runtime.handlerUrl(element,'genExercise');
    $('#generate',element).click(function(eventObject){
       submit_times=document.getElementById("submitTimes").value;
          alert(submit_times);
        $.ajax({
            type:"POST",
            url:handlerGenExercise,                                                                                                data:JSON.stringify({"data":submit_times}),
            success:genExerciseCallBack
                                                                                           

        });
    });
    
    $('#addOldExercise',element).click(function(eventObject){
       $.ajax({
            type:"POST",
            url:handlerAddOldExercise,
            data:JSON.stringify({"data":"andOldExercise"}),
            success:addOldExercise
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
