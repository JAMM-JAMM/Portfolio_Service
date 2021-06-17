from flask import Flask, blueprints
from flask_jwt_extended import JWTManager
from config import USER, HOST, PORT, DB, JWT_SECRET_KEY
from modules.auth import auth_blueprint
from modules.education import education_blueprint
from modules.award import award_blueprint
from modules.project import project_blueprint

demo = Flask(__name__)
jwt = JWTManager(demo)

demo.register_blueprint(auth_blueprint)
demo.register_blueprint(education_blueprint)
demo.register_blueprint(award_blueprint)
demo.register_blueprint(project_blueprint)

if __name__ == '__main__':
    demo.run(host='127.0.0.1', port=5000, debug=True)