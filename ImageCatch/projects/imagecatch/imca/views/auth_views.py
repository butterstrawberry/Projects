from flask import Blueprint, url_for, render_template, flash, request, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import redirect

from imca import db
from imca.forms import UserCreateForm, UserLoginForm, UserChangeForm, PasswordForm
from imca.models import User

import functools

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signup/', methods=('GET', 'POST'))
def signup():
    form = UserCreateForm()
    if request.method == 'POST' and form.validate_on_submit():
        user = User.query.filter_by(userid=form.userid.data).first()
        user1 = User.query.filter_by(email=form.email.data).first()
        if not user and not user1:
            user = User(userid=form.userid.data,
                        password=generate_password_hash(form.password1.data),
                        username=form.username.data,
                        email=form.email.data)
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('auth.login'))
        else:
            flash('이미 존재하는 사용자거나 이메일입니다.')
    return render_template('auth/signup.html', form=form)

@bp.route('/login/', methods=('GET', 'POST'))
def login():
    form = UserLoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        error = None
        user = User.query.filter_by(userid=form.userid.data).first()
        if not user:
            error = "존재하지 않는 사용자입니다."
        elif not check_password_hash(user.password, form.password.data):
            error = "비밀번호가 올바르지 않습니다."
        if error is None:
            session.clear()
            session['user_id'] = user.id
            return redirect(url_for('main.index'))
        flash(error)
    return render_template('auth/login.html', form=form)

@bp.route('/checkpasswd/', methods=('GET', 'POST'))
def checkpasswd():
    form = PasswordForm()
    user_id = session.get('user_id')
    if request.method == 'POST' and form.validate_on_submit():
        error = None
        user = User.query.get_or_404(user_id) 
        if not check_password_hash(g.user.password, form.checkpassword.data):
            error = "비밀번호가 올바르지 않습니다."
        if error is None:
            return redirect(url_for('auth.mypage'))
        flash(error)
    return render_template('auth/checkpasswd.html', form=form)

@bp.route('/find/')
def findpasswd():
    return render_template('auth/findpasswd.html')

@bp.route('/mypage/')
def mypage():
    return render_template('auth/mypage.html')

@bp.route('/mypage/change/<int:user_id>', methods=('GET', 'POST'))
def change(user_id):
    user = User.query.get_or_404(user_id)
    form = UserChangeForm()
    if request.method == 'POST':
        if form.validate_on_submit() and check_password_hash(g.user.password, form.old_password.data):
            user.password = generate_password_hash(form.new_password1.data)
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('auth.mypage', user_id=user_id))
        else:
            flash('기존 비밀번호가 틀렸습니다.')
    return render_template('auth/changepasswd.html', form=form)

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.get(user_id)

@bp.route('/logout/')
def logout():
    session.clear()
    return redirect(url_for('main.index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)
    return wrapped_view

@bp.route('/delete/<int:user_id>')
def delete(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    session.clear()
    return redirect(url_for('auth.login'))