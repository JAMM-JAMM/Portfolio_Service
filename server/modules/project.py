import os
import sys
from ..database import db
from ..demo import demo
from flask import Blueprint, jsonify
from flask_restx import reqparse, Api, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

cursor = db.cursor()

project_blueprint = Blueprint('project_blueprint', __name__)

project_api = Api(project_blueprint)
api = Api(demo)

parser_project = reqparse.RequestParser()
parser_project.add_argument('data_id')
parser_project.add_argument('projectName')
parser_project.add_argument('projectDesc')
parser_project.add_argument('projectStart')
parser_project.add_argument('projectEnd')

class Project(Resource):
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        args = parser_project.parse_args()
        projectName = args['projectName']
        projectDesc = args['projectDesc']
        projectStart = args['projectStart']
        projectEnd = args['projectEnd']

        error = None

        if not user_id:
            error = 'invalid user_id'
        elif not projectName:
            error = 'invalid projectName'
        elif not projectDesc:
            error = 'invalid projectDesc'
        elif not projectStart:
            error = 'invalid projectStart'
        elif not projectEnd:
            error = 'invalid projectEnd'
        
        if error is None:
            sql = "INSERT INTO `project` (`user_id`, `projectName`, `projectDesc`, `projectStart`, `projectEnd`) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (user_id, projectName, projectDesc, projectStart, projectEnd))
            db.commit()

            sql = "SELECT `id`, `projectName`, `projectDesc`, `projectStart`, `projectEnd` FROM `project` WHERE `user_id` = %s"
            cursor.execute(sql, (user_id, ))
            result = cursor.fetchall()

            return jsonify(
                status = 'success',
                result = result
            )
        else:
            return jsonify(
                status = 'failure',
                result = {"message": error}
            )
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()

        sql = "SELECT `id`, `projectName`, `projectDesc`, `projectStart`, `projectEnd` FROM `project` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id, ))
        result = cursor.fetchall()
        
        error = None

        # 입력한 유저의 정보가 없을 때
        if result is None:
            error = "This email is not registered"

        # 입력한 유저의 정보가 있을 때
        if error is None:
            return jsonify(
                status = "success", 
                result = result
                )
        
        return jsonify(
            status = "failure", 
            message = {'error': error}
            )
    
    @jwt_required
    def put(self):
        user_id = get_jwt_identity()
        args = parser_project.parse_args()
        data_id = args['data_id']
        projectName = args['projectName']
        projectDesc = args['projectDesc']
        projectStart = args['projectStart']
        projectEnd = args['projectEnd']

        error = None

        if data_id:
            error = 'invalid data_id'
        elif not projectName:
            error = 'invaild projectName'
        elif not projectDesc:
            error = 'invalid projectDesc'
        elif not projectStart:
            error = 'invalid projectStart'
        elif not projectEnd:
            error = 'invalid projectEnd'
        
        if error is None:
            sql = "UPDATE `project` SET `projectName` = %s, `projectDesc` = %s, `projectStart` = %s, `projectEnd` = %s WHERE `id` = %s"
            cursor.execute(sql, (projectName, projectDesc, projectStart, projectEnd, data_id))
            db.commit()
            
            sql = "SELECT `id`, `projectName`, `projectDesc`, `projectStart`, `projectEnd` FROM `project` WHERE `user_id` = %s"
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
        args = parser_project.parse_args()
        data_id = args['data_id']
        sql = "DELETE FROM `project` WHERE `id` = %s"
        cursor.execute(sql, (data_id, ))
        db.commit()
        
        sql = "SELECT `id`, `projectName`, `projectDesc`, `projectStart`, `projectEnd` FROM `project` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id, ))
        result = cursor.fetchall()

        return jsonify(
            status = "success", 
            result = result
            )

api.add_resource(Project, '/project')