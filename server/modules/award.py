import os
import sys
from database import db
from demo import demo
from flask import Blueprint, jsonify
from flask_restx import reqparse, Api, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

cursor = db.cursor()

award_blueprint = Blueprint('award_blueprint', __name__)

award_api = Api(award_blueprint)
api = Api(demo)

parser_award = reqparse.RequestParser()
parser_award.add_argument('data_id')
parser_award.add_argument('awardName')
parser_award.add_argument('awardDesc')

class Awards(Resource):
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        args = parser_award.parse_args()
        awardName = args['awardName']
        awardDesc = args['awardDesc']

        error = None

        if not awardName:
            error = 'invalid awardName'
        elif not awardDesc:
            error = 'invalid awardDesc'
        
        if error is None:
            sql = "INSERT INTO `awards` (`user_id`, `awardName`, `awardDesc`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (user_id, awardName, awardDesc))
            db.commit()

            sql = "SELECT `id`, `awardName`, `awardDesc` FROM `awards` WHERE `user_id` = %s"
            cursor.execute(sql, (user_id, ))
            result = cursor.fetchall()

            return jsonify(
                status = "success",
                result = result
            )
        else:
            return jsonify(
                status = 'failure',
                result = {
                    'message': error
                }
            )
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        args = parser_award.parse_args()

        sql = "SELECT `id`, `awardName`, `awardDesc` FROM `awards` WHERE `user_id` = %s"
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
            status = 'failure',
            message = {
                'error': error
            }
        )

    @jwt_required
    def put(self):
        user_id = get_jwt_identity()
        args = parser_award.parse_args()
        data_id = args['data_id']
        awardName = args['awardName']
        awardDesc = args['awardDesc']

        error = None

        if not data_id:
            error = 'invalid data_id'
        elif not awardName:
            error = 'invalid awardName'
        elif not awardDesc:
            error = 'invalid awardDesc'
        
        if error is None:
            sql = "UPDATE `awrads` SET `awardName` = %s, `awardDesc` = %s WHERE `id` = %s"
            cursor.execute(sql, (awardName, awardDesc, data_id))
            db.commit()

            sql = "SELECT `id`, `awardName`, `awardDesc` FROM `awards` WHERE `user_id` = %s"
            cursor.execute(sql, (user_id, ))
            result = cursor.fetchall()

            return jsonify(
                 status = "success",
                 result = result
            )
        else:
            return jsonify(
                status = 'failure',
                result = {
                    "message": error
                }
            )
    @jwt_required
    def delete(self):
        user_id = get_jwt_identity()
        args = parser_award.parse_args()
        data_id = args['data_id']

        sql = "DELETE FROM `awards` WHERE `id` = %s"
        cursor.execute(sql, (data_id, ))
        db.commit()

        sql = "SELECT `id`, `awardName`, `awardDesc` FROM `awards` WHERE `user_email` = %s"
        cursor.execute(sql, (user_id, ))
        result = cursor.fetchall()

        return jsonify(
            status = "success",
            result = result
        )

api.add_resource(Awards, '/award')