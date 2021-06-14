from flask import Flask
from flask_jwt_extended import JWTManager
from config import USER, HOST, PORT, DB, JWT_SECRET_KEY

demo = Flask(__name__)
jwt = JWTManager(demo)

from modules.auth import auth_blueprint
demo.register_blueprint(auth_blueprint)

if __name__ == '__main__':
    demo.run(host='127.0.0.1', port=5000, debug=True)