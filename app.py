
# app.py

from flask import Flask, render_template
from flask_scss import Scss



app = Flask(__name__)



@app.route("/")
def index():
    return render_template("index.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


if __name__ in "__main__":
    app.run(debug=True)


