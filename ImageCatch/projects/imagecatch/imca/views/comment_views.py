from datetime import datetime

from flask import Blueprint, url_for, request, render_template, g, flash
from werkzeug.utils import redirect

from imca import db
from imca.forms import CommentForm
from imca.models import Board, Comment
from imca.views.auth_views import login_required

bp = Blueprint('comment', __name__, url_prefix='/comment')


@bp.route('/create/board/<int:board_id>', methods=('GET', 'POST'))
@login_required
def create_board(board_id):
    form = CommentForm()
    board = Board.query.get_or_404(board_id)
    if request.method == 'POST' and form.validate_on_submit():
        comment = Comment(user=g.user, content=form.content.data, create_date=datetime.now(), board=board)
        db.session.add(comment)
        db.session.commit()
        return redirect('{}#comment_{}'.format(
            url_for('board.detail', board_id=board_id), comment.id))
    return render_template('comment/comment_form.html', form=form)

@bp.route('/modify/board/<int:comment_id>', methods=('GET', 'POST'))
@login_required
def modify_board(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if g.user != comment.user:
        flash('수정권한이 없습니다')
        return redirect(url_for('board.detail', board_id=comment.board.id))
    if request.method == 'POST':
        form = CommentForm()
        if form.validate_on_submit():
            form.populate_obj(comment)
            comment.modify_date = datetime.now()
            db.session.commit()
            return redirect('{}#comment_{}'.format(
                url_for('board.detail', board_id=comment.board.id), comment.id))
    else:
        form = CommentForm(obj=comment)
    return render_template('comment/comment_form.html', form=form)

@bp.route('/delete/board/<int:comment_id>')
@login_required
def delete_board(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    board_id = comment.board.id
    if g.user != comment.user and g.user.permissions != 0:
        flash('삭제권한이 없습니다')
        return redirect(url_for('board.detail', board_id=board_id))
    elif g.user.permissions == 0:
        db.session.delete(comment)
        db.session.commit()
        return redirect(url_for('board.detail', board_id=board_id))
    else:
        db.session.delete(comment)
        db.session.commit()
        return redirect(url_for('board.detail', board_id=board_id))