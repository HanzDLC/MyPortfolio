
# app.py

import os
import smtplib
from email.message import EmailMessage

from flask import Flask, render_template, request, jsonify
from flask_scss import Scss
from projects_data import get_projects
from tools_data import get_tool_info

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


app = Flask(__name__)
app.jinja_env.globals.update(get_tool_info=get_tool_info)



from index_data import get_about_content, get_skills, get_services, get_certifications
from tools_data import get_all_tools_with_icons

CONTACT_TO = "hdlcruz03@gmail.com"


@app.route("/")
def index():
    return render_template(
        "index.html",
        about_content=get_about_content(),
        skills=get_skills(),
        services=get_services(),
        certifications=get_certifications(),
        showcase_tools=get_all_tools_with_icons(),
        contact_to=CONTACT_TO,
    )


@app.route("/about")
def about():
    about_content = get_about_content()
    return render_template(
        "about.html",
        about_content=about_content,
        contact_to=CONTACT_TO,
    )


@app.route("/projects")
def projects():
    projects_list = get_projects()
    return render_template("projects.html", projects=projects_list, contact_to=CONTACT_TO)


@app.route("/cv")
@app.route("/documents")
def documents():
    return render_template("documents.html", contact_to=CONTACT_TO)


@app.route("/contact", methods=["POST"])
def contact():
    payload = request.get_json(silent=True) or request.form
    subject = (payload.get("subject") or "").strip()
    message = (payload.get("message") or "").strip()

    if not subject or not message:
        return jsonify(ok=False, error="Subject and message are required."), 400
    if len(subject) > 200 or len(message) > 5000:
        return jsonify(ok=False, error="Subject or message is too long."), 400

    gmail_user = os.environ.get("GMAIL_USER")
    gmail_password = os.environ.get("GMAIL_APP_PASSWORD")
    if not gmail_user or not gmail_password:
        return jsonify(ok=False, error="Email service is not configured."), 503

    try:
        msg = EmailMessage()
        msg["From"] = gmail_user
        msg["To"] = CONTACT_TO
        msg["Reply-To"] = gmail_user
        msg["Subject"] = f"[Portfolio Contact] {subject}"
        msg.set_content(message)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=15) as server:
            server.login(gmail_user, gmail_password)
            server.send_message(msg)
    except smtplib.SMTPAuthenticationError:
        return jsonify(ok=False, error="Email auth failed. Check the app password."), 502
    except (smtplib.SMTPException, OSError) as exc:
        return jsonify(ok=False, error=f"Could not send email: {exc.__class__.__name__}"), 502

    return jsonify(ok=True)


if __name__ in "__main__":
    app.run(debug=True)
