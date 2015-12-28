"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
import os
import json
from xblock.core import XBlock
from xblock.fields import Scope, Integer
from xblock.fragment import Fragment


class ExerciseXBlock(XBlock):
    """
    XBlock to create exercise.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.
    dataJson=""
    submitTimes=0

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the ExerciseXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/exercise.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/exercise.css"))
        frag.add_javascript(self.resource_string("static/js/src/exercise.js"))
        frag.initialize_js('ExerciseXBlock')
        return frag
    
    def studio_view(self,context=None):
        """ add exercise"""
        html = self.resource_string("static/html/exercise_edit.html")
        frag = Fragment(html.format(self=self))
        frag.add_javascript(self.resource_string("static/js/src/exercise_edit.js"))
        frag.initialize_js('ExerciseXBlock')
        return frag
    @XBlock.json_handler
    def addNewExercise(self,data,suffix=''):
        #pull from github
        os.system("/var/www/zyni/script/pullFromGithub.sh")
        #walk path to get the max q_number
        path="/var/www/zyni/os_course_exercise_library/data/json/"
        max_q_number=1
        for parent,dirnames,filenames in os.walk(path):
            for filename in filenames:
                (shortname,extension)=os.path.splitext(filename)
                if(max_q_number<int(shortname)):
                    max_q_number=int(shortname)
        #the new created exercise'q_number
        q_number=max_q_number+1
        data["q_number"]=q_number
        #json Object to string
        json_data=json.dumps(data)
        #save credated exercise
        file_dir=os.path.join(path,data['type'])
        file_name=str(q_number)+".json"
        file_path=os.path.join(file_dir,file_name)
        fileIn=open(file_path,'w')
        fileIn.write(json_data)
        fileIn.close()
        check_path="https://github.com/chyyuu/os_course_exercise_library/tree/master/data/json/"+data['type']+"/"+file_name
        #push to github
        os.system("/var/www/zyni/script/pushToGithub.sh "+file_name)        
        return{'q_number':q_number,"message":check_path}
    @XBlock.json_handler
    def addOldExercise(self,data,suffix=''):
        #scan "/var/www/zyni/exercise_xblock_data/classifiedExerciseLibrary"
        path="/var/www/zyni/exercise_xblock_data/classifiedExerciseLibrary/"
        
        
        return {"data":os.listdir(path)}
    
    @XBlock.json_handler
    def getQList(self,data,suffix=''):
        #scan "/var/www/zyni/exercise_xblock_data/classifiedExerciseLibrary"+data["data"]
        path=os.path.join("/var/www/zyni/exercise_xblock_data/classifiedExerciseLibrary/",data["data"])
        QList=[]
        for filename in os.listdir(path):
              (shortname,extension)=os.path.splitext(filename)
              QList.append(shortname)                                                                                                                                  
        return {"data":sorted(QList),"qType":data["data"]}  
    
    @XBlock.json_handler
    def readFile(self,data,suffix=''):
        #read file "/var/www/zyni/exercise_xblock_data/classifiedExerciseLibrary/qType/qNumber.json"
        path=os.path.join("/var/www/zyni/exercise_xblock_data/classifiedExerciseLibrary/",data["qType"])
        path = os.path.join(path,data["value"]+".json")
        fileOut=open(path,'r')
        data=fileOut.read()
        fileOut.close()
        self.dataJson=data
        return {"data":self.dataJson}


    @XBlock.json_handler
    def genExercise(self,data,suffix=''):
        self.submitTimes=data["data"]
        return {"data":self.submitTimes}
    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ExerciseBlock",
             """<vertical_demo>
                <exercise/>
                <exercise/>
                <exercise/>
                </vertical_demo>
             """),
        ]
