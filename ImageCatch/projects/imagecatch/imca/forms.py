from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SelectField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Length, EqualTo, Email

class BoardForm(FlaskForm):
    title = StringField('제목', validators=[DataRequired('제목은 필수입력 항목입니다.')])
    content = TextAreaField('내용', validators=[DataRequired('내용은 필수입력 항목입니다.')])
    sections = SelectField('구분', choices=['품목요청', '사기신고', '잡담'], validators=[DataRequired()])

class UserCreateForm(FlaskForm):
    userid = StringField('아이디', validators=[DataRequired(), Length(min=3, max=25)])
    password1 = PasswordField('비밀번호', validators=
                              [DataRequired(), EqualTo('password2', '비밀번호가 일치하지 않습니다.')])
    password2 = PasswordField('비밀번호확인', validators=[DataRequired()])
    username = StringField('이름', validators=[DataRequired(), Length(min=3, max=25)])
    email = EmailField('이메일', validators=[DataRequired(), Email()])

class UserLoginForm(FlaskForm):
    userid = StringField('사용자이름', validators=[DataRequired(), Length(min=3, max=25)])
    password = PasswordField('비밀번호', validators=[DataRequired()])

class UserChangeForm(FlaskForm):
    old_password = PasswordField('기존 비밀번호', validators=[DataRequired()] )
    new_password1 = PasswordField('새로운 비밀번호', validators=
                              [DataRequired(), EqualTo('new_password2', '비밀번호가 일치하지 않습니다.')])
    new_password2 = PasswordField('새로운 비밀번호확인', validators=[DataRequired()])

class CommentForm(FlaskForm):
    content = TextAreaField('내용', validators=[DataRequired()])

class PasswordForm(FlaskForm):
    checkpassword = PasswordField('비밀번호', validators=[DataRequired()])