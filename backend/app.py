# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS
from config.settings import SECRET_KEY, DEBUG
from app.routes.student_routes import student_bp
from app.routes.fee_routes import fee_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = SECRET_KEY

    # Register blueprints
    app.register_blueprint(student_bp, url_prefix='/api')
    app.register_blueprint(fee_bp, url_prefix='/api')

    return app

