from flask import Flask, render_template
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

import config

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
db = SQLAlchemy(metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate()

def page_not_found(e):
    return render_template('404.html'), 404

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    #app.run(host='0.0.0.0', port=5000)

    db.init_app(app)
    if app.config['SQLALCHEMY_DATABASE_URI'].startswith("sqlite"):
        migrate.init_app(app, db, render_as_batch=True)
    else:
        migrate.init_app(app, db)

    from . import models
    from .views import main_views, board_views, auth_views, comment_views, guide_views, chart_views, check_views, flask_upload, test
    app.register_blueprint(main_views.bp)
    app.register_blueprint(board_views.bp)
    app.register_blueprint(auth_views.bp)
    app.register_blueprint(comment_views.bp)
    app.register_blueprint(guide_views.bp)
    app.register_blueprint(chart_views.bp)
    app.register_blueprint(check_views.bp)
    app.register_blueprint(flask_upload.bp)
    app.register_blueprint(test.bp)


    from .filter import format_datetime
    app.jinja_env.filters['datetime'] = format_datetime

    app.register_error_handler(404, page_not_found)
    
    return app
