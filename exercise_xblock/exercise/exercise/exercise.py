"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer
from xblock.fragment import Fragment


class ExerciseXBlock(XBlock):
    """
    XBlock to create exercise.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.


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
