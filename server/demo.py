from flask import Flask, blueprints
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import JWT_SECRET_KEY

def create_demo():
    demo = Flask(__name__)

    demo.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY

    CORS(demo)

    jwt = JWTManager(demo)
    
    from modules.auth import auth_blueprint
    demo.register_blueprint(auth_blueprint)

    from modules.education import education_blueprint
    demo.register_blueprint(education_blueprint)

    from modules.award import award_blueprint
    demo.register_blueprint(award_blueprint)

    from modules.project import project_blueprint
    demo.register_blueprint(project_blueprint)

    from modules.certificate import certificate_blueprint
    demo.register_blueprint(certificate_blueprint)
    
    return demo

# if __name__ == '__main__':
#     demo.run(host='127.0.0.1', port=5000, debug=True)