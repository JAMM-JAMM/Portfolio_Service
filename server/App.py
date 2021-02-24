import pymysql
from flask import Flask, flash
from flask_restful import reqparse, abort, Api, Resource

# User API 구현을 위한 새로운 패키지 로드
from flask import jsonify
from flask import request
from flask import session

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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

# 회원가입
@app.route('/auth/register', methods=['GET','POST'])
def register():
    # POST 요청을 받았다면
    if request.method == 'POST':
        # 아이디와 비밀번호를 폼에서 가져온다.
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
        
        # 이미 등록된 계정이라면
        sql = 'SELECT id FROM user WHERE email = %s'
        cursor.execute(sql, (email,))
        result = cursor.fetchone()

        if result is not None:
            error = '{} is already registered.'.format(email)
        
        # 에러가 발생하지 않았다면 회원가입 실행
        if error is None:
            sql = "INSERT INTO `user` (`fullname`, `email`, `password`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (fullname, email, generate_password_hash(password)))
            db.commit()
            return jsonify(status = "success", result = {"fullname": fullname, "email": email})
        else:
            return jsonify(status = "failure", result = {"message": error})
    # GET 요청을 받았다면
    else:
        sql = "SELECT `email` FROM `user`"
        cursor.execute(sql)
        user_info = cursor.fetchall()
        return jsonify(status = "success", result = user_info)

# 로그인
@app.route('/auth/login', methods=['POST'])
def login():
    # POST 요청을 받았다면
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        error = None

        sql = 'SELECT email, password FROM user WHERE email = %s'
        cursor.execute(sql, (email,))
        user = cursor.fetchone()

        # 입력한 유저의 정보가 없을 때
        if user is None:
            error = "This email({}) is not registered".format(email)
        
        # 비밀번호가 틀렸을 때
        # user는 tuple 타입으로 데이터 반환, user[0]은 email, user[1]은 password
        elif not (user == None or check_password_hash(user[1], password)):
            error = 'Incorrect password'
        
        # 정상적인 정보를 요청받았다면
        if error is None:
            # 로그인을 위해 기존 session을 비운다.
            session.clear()
            # 지금 로그인한 유저의 정보로 session을 등록한다.
            session['user_id'] = user[0]
            return jsonify(status = "success", result = {"email": email, "session": session['user_id']})

        return jsonify(status = "failure", result = {'error': error})

# 로그아웃
@app.route('/auth/logout')
def logout():
    # 현재 session을 비운다.
    session.clear()
    return jsonify(status = "success", result = {"msg": "logout!"})

"""
Portfolio APIs: 내 포트폴리오 보기, 수정, 업로드, 삭제

Education API: 학교이름, 전공 정보, 학위를 입력받아 학력에 대한 정보
"""

@app.route('/education', methods = ['GET','POST','PUT','DELETE'])
def education():
    # POST 요청을 받았다면
    if request.method == 'POST':
        fullname = request.form['fullname']
        university = request.form['university']
        major = request.form['major']
        degree = request.form['degree']

        error = None

        if not fullname:
            error = "invalid fullname"
        elif not university:
            error = "invalid university"
        elif not major:
            error = "invalid major"
        elif not degree:
            error = "invalid error"

        # 이미 등록된 정보라면
        sql = 'SELECT `fullname` From education WHERE (`fullname` = %s) AND (`university` = %s) AND (`major` = %s) AND (`degree` = %s)'
        cursor.execute(sql, (fullname, university, major, degree))
        edu_info = cursor.fetchone()

        if edu_info is not None:
            error = '{} is already existed.'.format(fullname)

        # 에러가 발생하지 않았다면, 학력 정보 등록 실행
        if error is None:
            sql = "INSERT INTO `user` (`fullname`, `university`, `major`, `degree`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (fullname, university, major, degree))
            db.commit()
            return jsonify(
                status = "success", 
                result = {
                    "fullname": fullname, 
                    "university": university, 
                    "major": major, 
                    "degree": degree
                }
            )
        else:
            return jsonify(
                status = "failure", 
                result = {
                    "message": error
                }
            )
    
    # GET 요청을 받았다면
    elif request.method == "GET":
        sql = "SELECT * FROM `education`"
        cursor.execute(sql)
        education_info = cursor.fetchall()
        return jsonify(
            status = "success", 
            result = education_info
        )
    
    # PUT 요청을 받았다면
    elif request.method == "PUT":
        edu_id = request.form['edu_id']
        fullname = request.form['fullname']
        university = request.form['university']
        major = request.form['major']
        degree = request.form['degree']

        error = None

        if not fullname:
            error = "invalid fullname"
        elif not university:
            error = "invalid university"
        elif not major:
            error = "invalid major"
        elif not degree:
            error = "invalid error"

        if error is None:
            sql = "UPDATE `education` SET `fullname` = %s, `university` = %s, `major` = %s, `degree` = %s WHERE `id` = %s"
            cursor.execute(sql, (fullname, university, major, degree, edu_id))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'fullname': fullname,
                    'university': university,
                    'major': major,
                    'degree': degree
                }
            )
        else:
            return jsonify(
                status = "failure", 
                result = {
                    "message": error
                }
            )
    
    # DELETE 요청을 받았다면
    elif request.method == 'DELETE':
        delete_id = request.form['delete_id']

        error = None

        # 요청받은 id가 존재하지 않으면
        sql = 'SELECT `id` FROM education WHERE id = %s'
        cursor.execute(sql, (delete_id,))
        result = cursor.fetchone()

        if result is None:
                error = "{}'s education data is not existed.".format(delete_id)

        # 에러가 발생하지 않았다면 삭제 실행
        if error is None:
            sql = "DELETE FROM `education` WHERE `id` = %s"
            cursor.execute(sql, (delete_id,))
            db.commit()
            return jsonify(
                status = 'success',
                result = {
                    'delete_id': delete_id
                }
            )
        else:
            return jsonify(
                status = 'failure', result = {'message': error}
            )



if __name__ == '__main__':                                                                                                                                                                                                                                                              
    app.run()