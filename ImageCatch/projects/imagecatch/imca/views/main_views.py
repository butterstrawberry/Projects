from flask import Blueprint, url_for, render_template
from werkzeug.utils import redirect

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/hello')
def hello_imca():
    return 'Hello, imagecatch!'

@bp.route('/')
def index():
    return render_template('check/imagetest.html')