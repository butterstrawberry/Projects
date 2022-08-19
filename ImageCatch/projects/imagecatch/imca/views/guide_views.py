from flask import Blueprint, url_for, render_template

bp = Blueprint('guide', __name__, url_prefix='/guide')

@bp.route('/')
def content():
    return render_template('guide.html')