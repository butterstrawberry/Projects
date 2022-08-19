from flask import Blueprint, render_template, request, url_for, g, flash
from werkzeug.utils import redirect
from .. import db
from ..forms import BoardForm, CommentForm
from ..models import Board, User
from datetime import datetime
from imca.views.auth_views import login_required

bp = Blueprint('board', __name__, url_prefix='/board')


@bp.route('/list/')
def _list():
    page = request.args.get('page', type=int, default=1)
    kw = request.args.get('kw', type=str, default='')

    board_list = Board.query.order_by(Board.create_date.desc())
    if kw:
        search = '%%{}%%'.format(kw)
        board_list = board_list \
            .join(User) \
            .filter(Board.title.ilike(search) |  
                    Board.content.ilike(search) |  
                    User.username.ilike(search)  
                    ) \
            .distinct()

    board_list = board_list.paginate(page, per_page=10)
    return render_template('board/board_list.html', board_list=board_list, page=page, kw=kw)


@bp.route('/detail/<int:board_id>/')
def detail(board_id):
    form = CommentForm()
    board = Board.query.get_or_404(board_id)
    return render_template('board/board_detail.html', board=board, form=form)

@bp.route('/create/', methods=('GET', 'POST'))
@login_required
def create():
    form = BoardForm()
    if request.method == 'POST' and form.validate_on_submit() and g.user.permissions == 1:
        board = Board(sections=form.sections.data, title=form.title.data, content=form.content.data, create_date=datetime.now(), user=g.user)
        db.session.add(board)
        db.session.commit()
        return redirect(url_for('board._list'))
    elif request.method == 'POST' and g.user.permissions == 0:
        board = Board(title=form.title.data, content=form.content.data, create_date=datetime.now(), user=g.user)
        db.session.add(board)
        db.session.commit()
        return redirect(url_for('board._list'))
    return render_template('board/board_form.html', form=form)

@bp.route('/modify/<int:board_id>', methods=('GET', 'POST'))
@login_required
def modify(board_id):
    board = Board.query.get_or_404(board_id)
    if g.user != board.user:
        flash('수정권한이 없습니다')
        return redirect(url_for('board.detail', board_id=board_id))
    if request.method == 'POST':
        form = BoardForm()
        if form.validate_on_submit():
            form.populate_obj(board)
            board.modify_date = datetime.now()
            db.session.commit()
            return redirect(url_for('board.detail', board_id=board_id))
        elif g.user.permissions == 0:
            form.populate_obj(board)
            board.sections = '공지사항'
            board.modify_date = datetime.now() 
            db.session.commit()
            return redirect(url_for('board.detail', board_id=board_id))    
    else:
        form = BoardForm(obj=board)
    return render_template('board/board_form.html', form=form)

@bp.route('/delete/<int:board_id>')
@login_required
def delete(board_id):
    board = Board.query.get_or_404(board_id)
    if g.user != board.user and g.user.permissions != 0:
        flash('삭제권한이 없습니다')
        return redirect(url_for('board.detail', board_id=board_id))
    elif g.user.permissions == 0:
        db.session.delete(board)
        db.session.commit()
        return redirect(url_for('board._list'))
    else:
        db.session.delete(board)
        db.session.commit()
        return redirect(url_for('board._list'))