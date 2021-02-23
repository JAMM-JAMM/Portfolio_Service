import pymysql
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

# User API 구현을 위한 새로운 패키지 로드
from flask import jsonify
from flask import request
from flask import session

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash


app = Flask(__name__)
api = Api(app)


db = pymysql.connect(
    user = 'root',
    host = '127.0.0.1',
    port = 3306,
    db = 'web_project',
    charset = 'utf8',
    autocommit = True
)

cursor = db.cursor()

parser = reqparse.RequestParser()


"""
User APIs : 유저 SignUp / Login / Logout

SignUp API : *fullname*, *email*, *password* 을 입력받아 새로운 유저를 가입시킵니다.
Login API : *email*, *password* 를 입력받아 특정 유저로 로그인합니다.
Logout API : 현재 로그인 된 유저를 로그아웃합니다.
"""

# session을 위한 secret_key 설정
app.config.from_mapping(SECRET_KEY='dev')

parser.add_argument('id')
parser.add_argument('fullname')
parser.add_argument('email')
parser.add_argument('password')

# 회원가입
@app.route('/auth/register', methods=['GET','POST'])
def register():
    args = parser.parse_args()
    if request.method == 'POST':
        sql = "SELECT `email` FROM `user` WHERE `email` = %s"
        cursor.execute(sql, (args['email'], ))
        user = cursor.fetchone()
        
        error = None

        if not args['fullname']:
            error = 'invalid fullname'
        elif not args['email']:
            error = 'invalid email'
        elif not args['password']:
            error = 'invalid password'
        elif user:
            error = 'This email({}) was already registered'.format(args['email'])
        
        if error is None:
            sql = "INSERT INTO `user` (`fullname`, `email`, `password`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (args['fullname'], args['email'], generate_password_hash(args['password'])))
            db.commit()
            return jsonify(status = "success", result = {"fullname": args['fullname'], "email": args['email']})
        else:
            return jsonify(status = "failure", result = {"message": error})
    else:
        sql = "SELECT `email` FROM `user`"
        cursor.execute(sql)
        user_info = cursor.fetchall()
        return jsonify(status = "success", result = user_info)

# 로그인
@app.route('/auth/login', methods=['POST'])
def login():
    args = parser.parse_args()
    if request.method == 'POST':
        sql = "SELECT `password` FROM `user` WHERE `email` = %s"
        cursor.execute(sql, (args['email'], ))
        user = cursor.fetchone()

        error = None

        if user is None:
            error = "This email({}) is not registered".format(args['email'])
        elif not check_password_hash(user[0], args['password']):
            error = 'Incorrect password'
        
        if error is None:
            session.clear()
            session['email'] = user['email']
            
            return jsonify(status = "success", result = "Login Success!")

        return jsonify(status = "failure", result = {'message': error})

# 로그아웃
@app.route('/auth/logout')
def logout():
    try:
        session.clear()
        return jsonify(status = "success", result = {'message': 'Logout!'})
    except:
        return jsonify(status = "failure", result = "You're not logged in")

if __name__ == '__main__':                                                                                                                                                                                                                                                              
    app.run()