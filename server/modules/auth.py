import os
import sys
from database import db
from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# cursor
cursor = db.cursor()

# Blueprint
auth_blueprint = Blueprint('auth_blueprint', __name__, url_prefix='/auth')

"""
User APIs : 유저 SignUp / Login / Logout

SignUp API : *fullname*, *email*, *password* 을 입력받아 새로운 유저를 가입시킵니다.
Login API : *email*, *password* 를 입력받아 특정 유저로 로그인합니다.
Logout API : 현재 로그인 된 유저를 로그아웃합니다.
"""

@auth_blueprint.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']

        error = None

        if not fullname:
            error = 'invalid fullname'
        elif not email:
            error = 'invalid email'
        elif not password:
            error = 'invalid password'
        
        sql = 'SELECT id FROM user WHERE email = %s'
        cursor.execute(sql, (email,))
        result = cursor.fetchone()

        if result is not None:
            error = '{} is already registered.'.format(email)
        
        if error is None:
            sql = "INSERT INTO `user` (`fullname`, `email`, `password`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (fullname, email, generate_password_hash(password)))
            db.commit()
            return jsonify(
                status = "success", 
                result = {"fullname": fullname, "email": email}
                )
        else:
            return jsonify(
                status = "failure", 
                result = {"message": error}
                )

@auth_blueprint.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        error = None

        sql = 'SELECT email, password FROM user WHERE email = %s'
        cursor.execute(sql, (email,))
        user = cursor.fetchone()

        if user is None:
            error = "This email({}) is not registered".format(email)
        
        elif not (user == None or check_password_hash(user[1], password)):
            error = 'Incorrect password'
        
        if error is None:
            access_token = create_access_token(identity=email)
            return jsonify(status = "success", result = {"email": email, "access_token": access_token})

        return jsonify(status = "failure", result = {'error': error})

