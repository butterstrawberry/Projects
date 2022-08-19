from flask import Blueprint, url_for, render_template, request
from werkzeug.utils import secure_filename


bp = Blueprint('check', __name__, url_prefix='/check')

@bp.route('/')
def main():
    return render_template('check/check_main.html')

@bp.route('/fileupload', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save('/home/ubuntu/Gachon_uni/projects/imagecatch/imca/uploads/' + secure_filename(f.filename))
        return 'file upload!'