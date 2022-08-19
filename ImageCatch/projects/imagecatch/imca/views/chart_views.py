from flask import Blueprint, url_for, render_template

bp = Blueprint('chart', __name__, url_prefix='/chart')

@bp.route('/')
def content():
    return render_template('chart.html')