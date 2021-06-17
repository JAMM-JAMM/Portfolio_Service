import os
import sys
from database import db
from flask import Blueprint, jsonify
from flask_restx import reqparse, Api, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

cursor = db.cursor()

certificate_blueprint = Blueprint('certificate_blueprint', __name__)

certificate_api = Api(certificate_blueprint)

parser_certificate = reqparse.RequestParser()
parser_certificate.add_argument('data_id')
parser_certificate.add_argument('certificateName')
parser_certificate.add_argument('certificateProvider')
parser_certificate.add_argument('certificateIssueDate')

class Certificate(Resource):
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        certificateName = parser_certificate.parse_args()
        certificateProvider = parser_certificate.parse_args()
        certificateIssueDate = parser_certificate.parse_args()

        error = None

        if not certificateName:
            error = 'invalid certificate Name'
        elif not certificateProvider:
            error = 'invalid certificate Provider'
        elif not certificateIssueDate:
            error = 'invalid certificate Issue Date'

        if error is None:
            sql = "INSERT INTO `certificate` (`user_id`, `certificateName`, `certificateProvider`, `certificateIssueDate`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (user_id, certificateName, certificateProvider, certificateIssueDate))
            db.commit()
            
            sql = "SELECT `id`, `certificateName`, `certificateProvider`, `certificateIssueDate` FROM `certificate` WHERE `user_id` = %s"
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
    def get(self):
        user_id = get_jwt_identity()

        sql = "SELECT `id`, `certificateName`, `certificateProvider`, `certificateIssueDate` FROM `certificate` WHERE `user_id` = %s"
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
            message = {
                'error': error
                }
            )
    @jwt_required
    def put(self):
        user_id = get_jwt_identity()
        args = parser_certificate.parse_args()
        data_id = args['data_id']
        certificateName = args['certificateName']
        certificateProvider = args['certificateProvider']
        certificateIssueDate = args['certificateIssueDate']

        error = None

        if not data_id:
            error = 'invalid data_id'
        elif not certificateName:
            error = 'invalid certificate Name'
        elif not certificateProvider:
            error = 'invalid certificate Provider'
        elif not certificateIssueDate:
            error = 'invalid certificate Issue Date'

        if error is None:
            sql = "UPDATE `certificate` SET `certificateName` = %s, `certificateProvider` = %s, `certificateIssueDate` = %s WHERE `id` = %s"
            cursor.execute(sql, (certificateName, certificateProvider, certificateIssueDate, data_id))
            db.commit()
            
            sql = "SELECT `id`, `certificateName`, `certificateProvider`, `certificateIssueDate` FROM `certificate` WHERE `user_id` = %s"
            cursor.execute(sql, (user_id, ))
            result = cursor.fetchall()
            
            return jsonify(
                status = "success", 
                result = result
                )

        else:
            return jsonify(
                status = "failure", 
                result = {
                    "message": error
                    }
                )
    
    @jwt_required
    def delete(self):
        user_id = get_jwt_identity()
        args = parser_certificate.parse_args()
        data_id = args['data_id']
        sql = "DELETE FROM `certificate` WHERE `id` = %s"
        cursor.execute(sql, (data_id, ))
        db.commit()
        
        sql = "SELECT `id`, `certificateName`, `certificateProvider`, `certificateIssueDate` FROM `certificate` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id, ))
        result = cursor.fetchall()
        
        return jsonify(
            status = "success", 
            result = result
            )

certificate_api.add_resource(Certificate, '/certificate')
