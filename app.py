
# app.py

from flask import Flask, render_template
from flask_scss import Scss
from projects_data import get_projects
from tools_data import get_tool_info, get_all_tools_with_icons


app = Flask(__name__)
app.jinja_env.globals.update(get_tool_info=get_tool_info)



from index_data import get_skills, get_services, get_certifications

@app.route("/")
def index():
    skills = get_skills()
    services = get_services()
    certifications = get_certifications()
    showcase_tools = get_all_tools_with_icons()
    return render_template("index.html", skills=skills, services=services, certifications=certifications, showcase_tools=showcase_tools)


@app.route("/projects")
def projects():
    projects_list = get_projects()
    return render_template("projects.html", projects=projects_list)


if __name__ in "__main__":
    app.run(debug=True)
