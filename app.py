
# app.py

import os
import smtplib
from email.message import EmailMessage

from flask import Flask, render_template, request, jsonify, url_for
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

# Curated featured projects for the homepage "Selected Works" strip,
# in display order. Lookup keys are project ids from projects_data.py.
FEATURED_WORK_IDS = (
    "aria-modal",
    "hermes-modal",
    "drivexp-modal",
    "mvp-school-mis-modal",
    "openclaw-modal",
)


def _build_featured_works():
    by_id = {}
    for category in get_projects():
        for project in category.get("projects", []):
            if project.get("id"):
                by_id[project["id"]] = (project, category.get("category", ""))
    works = []
    for idx, pid in enumerate(FEATURED_WORK_IDS, start=1):
        entry = by_id.get(pid)
        if not entry:
            continue
        project, category_name = entry
        works.append({
            "num": f"{idx:02d}",
            "title": project.get("title", ""),
            "category": category_name,
            "image": project.get("image"),
            "modal_id": project.get("id"),
            "tags": project.get("tags", [])[:3],
        })
    return works


@app.route("/")
def index():
    return render_template(
        "index.html",
        about_content=get_about_content(),
        skills=get_skills(),
        services=get_services(),
        certifications=get_certifications(),
        showcase_tools=get_all_tools_with_icons(),
        featured_works=_build_featured_works(),
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


def _serialize_projects_flat(grouped):
    """Flatten the category-grouped project structure into a list of dicts.

    Each item: id, title, category, card_description, tags, image_url, modal_url.
    """
    flat = []
    for category in grouped:
        category_name = category.get("category", "")
        for project in category.get("projects", []):
            image = project.get("image")
            image_url = (
                url_for("static", filename=image, _external=True) if image else None
            )
            modal_id = project.get("id")
            modal_url = (
                f"/projects#{modal_id}" if modal_id and project.get("has_modal") else None
            )
            flat.append({
                "id": modal_id,
                "title": project.get("title", ""),
                "category": category_name,
                "card_description": project.get("card_description", ""),
                "tags": project.get("tags", []),
                "image_url": image_url,
                "modal_url": modal_url,
            })
    return flat


@app.route("/api/projects")
def api_projects():
    """Return all portfolio projects as a flat JSON list.

    Response shape: a JSON array of project objects, each with keys
    ``id``, ``title``, ``category``, ``card_description``, ``tags``
    (list of strings), ``image_url`` (absolute URL or null), and
    ``modal_url`` (``/projects#<id>`` for projects with a modal, else null).
    Includes ``Access-Control-Allow-Origin: *`` for cross-origin consumers.
    """
    grouped = get_projects()
    response = jsonify(_serialize_projects_flat(grouped))
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/api/projects/featured")
def api_projects_featured():
    """Return the homepage "Selected Works" featured projects as JSON.

    Response shape matches ``/api/projects``: a JSON array of project
    objects (id, title, category, card_description, tags, image_url,
    modal_url), filtered to the ids in ``FEATURED_WORK_IDS`` and
    returned in that display order. Includes ``Access-Control-Allow-Origin: *``.
    """
    grouped = get_projects()
    flat = _serialize_projects_flat(grouped)
    by_id = {p["id"]: p for p in flat if p.get("id")}
    featured = [by_id[pid] for pid in FEATURED_WORK_IDS if pid in by_id]
    response = jsonify(featured)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


if __name__ in "__main__":
    app.run(debug=True)
