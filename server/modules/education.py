import os
import sys
from database import db
from demo import demo
from flask import Blueprint, jsonify
from flask_restx import reqparse, Api, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.patn.append(parent_dir)

# mysql db cursor
cursor = db.cursor()

# Blueprint
education_blueprint = Blueprint('education_blueprint', __name__)

# Restful API
education_api = Api(education_blueprint)
api = Api(demo)

"""
Portfolio APIs: 내 포트폴리오 보기, 수정, 업로드, 삭제

Education API: 학교이름, 전공 정보, 학위를 입력받아 학력에 대한 정보
"""

parser_education = reqparse.RequestParser()
parser_education.add_argument('data_id')
parser_education.add_argument('university')
parser_education.add_argument('major')
parser_education.add_argument('degree')

class Education(Resource):
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        args = parser_education.parse_args()
        university = args['university']
        major = args['major']
        degree = args['degree']

        error = None

        if not university:
            error = 'invalid university'
        elif not major:
            error = 'invalid major'
        elif not degree:
            error = 'invalid degree'
        
        if error is None:
            sql = "INSERT INTO `education` (`user_id`, `university`, `major`, `degree`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (user_id, university, major, degree))
            db.commit()

            sql = "SELECT `id`, 'university', `major`, `degree` FROM `education` WHERE `user_id` = %s"
            cursor.execute(sql, (user_id, ))
            result = cursor.fetchall()

            return jsonify(
                status = "success",
                result = result
            )
        else:
            return jsonify(
                status = "success",
                result = {
                    "message": error
                }
            )
    
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        sql = "SELECT `id`, `university`, `major`, `degree` FROM `education` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id, ))
        result = cursor.fetchall()

        error = None

        if result is None:
            error = "This user is not registered"

        if error is None:
            return jsonify(
                status = "success",
                result = result
            )
        return jsonify(
            status = "failure",
            message = {
                'error': error
            }
        )

    @jwt_required
    def put(self):
        user_id = get_jwt_identity()
        args = parser_education.parse_args()
        data_id = args['data_id']
        university = args['university']
        major = args['major']
        degree = args['degree']

        error = None

        if not university:
            error = 'invalid university'
        elif not major:
            error = 'invalid major'
        elif not degree:
            error = 'invalid degree'
        elif not data_id:
            error = 'invalid data_id'

        if error is None:
            sql = "UPDATE `education` SET `university` = %s, `major` = %s, `degree` = %s WHERE `id` = %s"
            cursor.execute(sql, (university, major, degree, data_id))
            db.commit()
            
            sql = "SELECT `id`, `university`, `major`, `degree` FROM `education` WHERE `user_id` = %s"
            cursor.execute(sql, (user_id, ))
            result = cursor.fetchall()

            return jsonify(
                status = "success", 
                result = result
                )
        else:
            return jsonify(
                status = "failure",
                result = {"message": error}
                )

    @jwt_required
    def delete(self):
        user_id = get_jwt_identity()
        args = parser_education.parse_args()
        data_id = args['data_id']

        sql = "DELETE FROM `education` WHERE `id` = %s"
        cursor.execute(sql, (data_id,))
        db.commit()

        sql = "SELECT `id`, `university`, `major`, `degree` FROM `education` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id, ))
        result = cursor.fetchall()

        return jsonify(
            status = "success", 
            result = result
            )

api.add_resource(Education, '/education')