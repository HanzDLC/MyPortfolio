
# app.py

from flask import Flask, render_template
from flask_scss import Scss
from projects_data import get_projects
from tools_data import get_tool_info


app = Flask(__name__)
app.jinja_env.globals.update(get_tool_info=get_tool_info)



from index_data import get_about_content, get_skills

@app.route("/")
def index():
    about_content = get_about_content()
    skills = get_skills()
    return render_template(
        "index.html",
        about_content=about_content,
        skills=skills
    )


@app.route("/about")
def about():
    about_content = get_about_content()
    return render_template(
        "about.html",
        about_content=about_content
    )


@app.route("/projects")
def projects():
    projects_list = get_projects()
    return render_template("projects.html", projects=projects_list)


@app.route("/cv")
@app.route("/documents")
def documents():
    return render_template("documents.html")


if __name__ in "__main__":
    app.run(debug=True)
