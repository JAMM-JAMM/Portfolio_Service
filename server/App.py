import pymysql
from flask import Flask, flash
from flask_restful import reqparse, abort, Api, Resource

# User API 구현을 위한 새로운 패키지 로드
from flask import jsonify
from flask import request

# flask_jwt_extended를 사용하여 서버와 클라이언트 사이에서 토큰으로 인증
from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt_identity

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


"""
User APIs : 유저 SignUp / Login / Logout

SignUp API : *fullname*, *email*, *password* 을 입력받아 새로운 유저를 가입시킵니다.
Login API : *email*, *password* 를 입력받아 특정 유저로 로그인합니다.
Logout API : 현재 로그인 된 유저를 로그아웃합니다.
"""

# flask_jwt_extended를 위한 secret_key 설정
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

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
            access_token = create_access_token(identity=email)
            return jsonify(status = "success", result = {"email": email, "access_token": access_token})

        return jsonify(status = "failure", result = {'error': error})

# 로그아웃
@app.route('/auth/logout')
def logout():
    return jsonify(status = "success", result = {"msg": "logout!"})

# 로그인 검증
# https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage/
@app.route('/protected')
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)

"""
Portfolio APIs: 내 포트폴리오 보기, 수정, 업로드, 삭제

Education API: 학교이름, 전공 정보, 학위를 입력받아 학력에 대한 정보
Awards API: 수상내역이름, 수상내역 정보를 입력받아 수상경력에 대한 정보
"""
parser_edu = reqparse.RequestParser()
parser_edu.add_argument('user_email')
parser_edu.add_argument('data_id')

class Education(Resource):
    @jwt_required
    def post(self):
        # current_user = get_jwt_identity()
        user_email = request.form['user_email']
        university = request.form['university']
        major = request.form['major']
        degree = request.form['degree']
        
        error = None

        if not university:
            error = 'invalid university'
        elif not major:
            error = 'invalid major'
        elif not degree:
            error = 'invalid degree'
        elif not user_email:
            error = 'not logged in'        

        if error is None:
            sql = "INSERT INTO `education` (`user_email`, `university`, `major`, `degree`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (user_email, university, major, degree))
            db.commit()
            return jsonify(
                status = "success", 
                result = {
                    'user_email': user_email,
                    'unviversity': university,
                    'major': major,
                    'degree': degree
                    }
                )
        else:
            return jsonify(status = "failure", result = {"message": error})

    @jwt_required
    def get(self):
        args = parser_edu.parse_args()
        sql = "SELECT `id`, `university`, `major`, `degree` FROM `education` WHERE `user_email` = %s"
        cursor.execute(sql, (args['user_email'], ))
        result = cursor.fetchall()
        return jsonify(
            status = "success",
            result = result
            )

    @jwt_required 
    def put(self):
        args = parser_edu.parse_args()
        university = request.form['university']
        major = request.form['major']
        degree = request.form['degree']

        error = None

        if not university:
            error = 'invalid university'
        elif not major:
            error = 'invalid major'
        elif not degree:
            error = 'invalid degree'
        elif not args['data_id']:
            error = 'invalid data_id'

        if error is None:
            sql = "UPDATE `education` SET `university` = %s, `major` = %s, `degree` = %s WHERE `id` = %s"
            cursor.execute(sql, (university, major, degree, args['data_id']))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'data_id': args['data_id'],
                    'university': university,
                    'major': major,
                    'degree': degree
                }
            )
        else:
            return jsonify(status = "failure", result = {"message": error})

    @jwt_required
    def delete(self):
        args = parser_edu.parse_args()
        sql = "DELETE FROM `education` WHERE `id` = %s"
        cursor.execute(sql, (args['data_id'], ))
        db.commit()
        return jsonify(
            status = "success",
            result = {
                'deleted_id': args['data_id']
            }
        )

parser_award = reqparse.RequestParser()
parser_award.add_argument('user_email')
parser_award.add_argument('data_id');

class Awards(Resource):
    @jwt_required
    def post(self):
        user_email = request.form['user_email']
        awardName = request.form['awardName']
        awardDesc = request.form['awardDesc']

        error = None

        if not user_email:
            error = 'invalid user_email'
        elif not awardName:
            error = 'invalid awardName'
        elif not awardDesc:
            error = 'invalid awardDesc'

        if error is None:
            sql = "INSERT INTO `awards` (`user_email`,`awardName`, `awardDesc`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (user_email, awardName, awardDesc))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'user_email': user_email,
                    'awardName': awardName,
                    'awardDesc': awardDesc
                }
            )
        else:
            return jsonify(status = "failure", result = {"message": error})
    @jwt_required
    def get(self):
        args = parser_award.parse_args()
        sql = "SELECT `id`, `awardName`, `awardDesc` FROM `awards` WHERE `user_email` = %s"
        cursor.execute(sql, (args['user_email'], ))
        result = cursor.fetchall()
        return jsonify(
            status = "success",
            result = result
        )
    @jwt_required  
    def put(self):
        args = parser_award.parse_args()
        awardName = request.form['awardName']
        awardDesc = request.form['awardDesc']

        error = None

        if not args['data_id']:
            error = 'invalid data_id'
        elif not awardName:
            error = 'invalid awardName'
        elif not awardDesc:
            error = 'invalid awardDesc'

        if error is None:
            sql = "UPDATE `awards` SET `awardName` = %s, `awardDesc` = %s WHERE `id` = %s"
            cursor.execute(sql, (awardName, awardDesc, args['data_id']))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'data_id': args['data_id'],
                    'awardName': awardName,
                    'awardDesc': awardDesc
                }
            )
        else:
            return jsonify(status = "failure", result = {"message": error})

    @jwt_required
    def delete(self):
        args = parser_award.parse_args()
        sql = "DELETE FROM `awards` WHERE `id` = %s"
        cursor.execute(sql, (args['data_id'], ))
        db.commit()
        return jsonify(
            status = "success",
            result = {
                'delete_id': args['data_id']
            }
        )

parser_project = reqparse.RequestParser()
parser_project.add_argument('user_email')

class Project(Resource):
    def post(self):
        user_email = request.form['user_email']
        projectName = request.form['projectName']
        projectDesc = request.form['projectDesc']
        projectStart = request.form['projectStart']
        projectEnd = request.form['projectEnd']

        error = None

        if not user_email:
            error = 'not logged in'
        elif not projectName:
            error = 'invaild projectName'
        elif not projectDesc:
            error = 'invalid projectDesc'
        elif not projectStart:
            error = 'invalid projectStart'
        elif not projectEnd:
            error = 'invalid projectEnd'
        
        # 이미 등록된 정보라면
        sql = 'SELECT * FROM `project` WHERE `user_email` = %s'
        cursor.execute(sql, (user_email, ))
        result = cursor.fetchone()

        if result is not None:
            error = '{}\'s info is already registered.'.format(user_email)
        
        if error is None:
            sql = "INSERT INTO `project` (`user_email`, `projectName`, `projectDesc`, `projectStart`, `projectEnd`) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (user_email, projectName, projectDesc, projectStart, projectEnd))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'user_email': user_email,
                    'projectName': projectName,
                    'projectDesc': projectDesc,
                    'projectStart': projectStart,
                    'projectEnd': projectEnd
                    }
                )
        else:
            return jsonify(status = "failure", result = {"message": error})

    def get(self):
        args = parser_project.parse_args()
        sql = "SELECT `id`, `projectName`, `projectDesc`, `projectStart`, `projectEnd` FROM `project` WHERE `user_email` = %s"
        cursor.execute(sql, (args['user_email'], ))
        result = cursor.fetchall()
        return jsonify(
            status = "success",
            result = result
        )
        return jsonify()
    def put(self):
        user_email = request.form['user_email']
        projectName = request.form['projectName']
        projectDesc = request.form['projectDesc']
        projectStart = request.form['projectStart']
        projectEnd = request.form['projectEnd']

        error = None

        if not user_email:
            error = 'not logged in'
        elif not projectName:
            error = 'invaild projectName'
        elif not projectDesc:
            error = 'invalid projectDesc'
        elif not projectStart:
            error = 'invalid projectStart'
        elif not projectEnd:
            error = 'invalid projectEnd'
        
        if error is None:
            sql = "UPDATE `project` SET `projectName` = %s, `projectDesc` = %s, `projectStart` = %s, `projectEnd` = %s WHERE `user_email` = %s"
            cursor.execute(sql, (projectName, projectDesc, projectStart, projectEnd, user_email))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'user_email': user_email,
                    'projectName': projectName,
                    'projectDesc': projectDesc,
                    'projectStart': projectStart,
                    'projectEnd': projectEnd
                    }
                )
        else:
            return jsonify(status = "failure", result = {"message": error})
    def delete(self):
        args = parser_project.parse_args()
        sql = "DELETE FROM `project` WHERE `user_email` = %s"
        cursor.execute(sql, (args['user_email'], ))
        db.commit()
        return jsonify(
            status = "success",
            result = {
                'user_email': args['user_email']
            }
        )

parser_certificate = reqparse.RequestParser()
parser_certificate.add_argument('user_email');

class Certificate(Resource):
    def post(self):
        user_email = request.form['user_email']
        certificateN = request.form['certificateN']
        certificateP = request.form['certificateP']
        certificateI = request.form['certificateI']

        error = None

        if not user_email:
            error = 'invalid user_email'
        elif not certificateN:
            error = 'invalid certificate Name'
        elif not certificateP:
            error = 'invalid certificate Provider'
        elif not certificateI:
            error = 'invalid certificate Issue Date'

        # 이미 등록된 정보라면
        sql = 'SELECT * FROM `certificate` WHERE `user_email` = %s'
        cursor.execute(sql, (user_email,))
        result = cursor.fetchone()

        if result is not None:
            error = '{}\'s info is already registered.'.format(user_email)

        if error is None:
            sql = "INSERT INTO `certificate` (`user_email`, `certificateN`, `certificateP`, `certificateI`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (user_email, certificateN, certificateP, certificateI))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'user_email': user_email,
                    'certificateN': certificateN,
                    'certificateP': certificateP,
                    'certificateI': certificateI
                }
            )
        else:
            return jsonify(status = "failure", result = {"message": error})
    
    def get(self):
        args = parser_certificate.parse_args()
        sql = "SELECT `id`, `certificateN`, `certificateP`, `certificateI` FROM `certificate` WHERE `user_email` = %s"
        cursor.execute(sql, (args['user_email'], ))
        result = cursor.fetchall()
        return jsonify(
            status = "success",
            result = result
        )
        return jsonify()

    def put(self):
        user_email = request.form['user_email']
        certificateN = request.form['certificateN']
        certificateP = request.form['certificateP']
        certificateI = request.form['certificateI']

        error = None

        if not user_email:
            error = 'invalid user_email'
        elif not certificateN:
            error = 'invalid certificate Name'
        elif not certificateP:
            error = 'invalid certificate Provider'
        elif not certificateI:
            error = 'invalid certificate Issue Date'

        if error is None:
            sql = "UPDATE`certificate` SET `user_email` = %s, `certificateN` = %s, `certificateP` = %s, `certificateI` = %s"
            cursor.execute(sql, (user_email, certificateN, certificateP, certificateI))
            db.commit()
            return jsonify(
                status = "success",
                result = {
                    'user_email': user_email,
                    'certificateN': certificateN,
                    'certificateP': certificateP,
                    'certificateI': certificateI
                }
            )
        else:
            return jsonify(status = "failure", result = {"message": error})
    
    def delete(self):
        args = parser_certificate.parse_args()
        sql = "DELETE FROM `certificate` WHERE `user_email` = %s"
        cursor.execute(sql, (args['user_email'], ))
        db.commit()
        return jsonify(
            status = "success",
            result = {
                'user_email': args['user_email']
            }
        )

api.add_resource(Certificate, '/portfolio/certificate')
api.add_resource(Project, '/portfolio/project')
api.add_resource(Education, '/portfolio/education')
api.add_resource(Awards, '/portfolio/awards')

if __name__ == '__main__':                                                                                                                                                                                                                                                              
    app.run(debug = True)