"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os 
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

def set_password(password,salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}") #### devuelve true o false si la contresaña  coincide 

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)
        if email is None or password is None:
            return jsonify('All fields are required'), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            request_user = User(email=email, password=password, salt=salt) ##se podria hacer con el metodo init
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify('Registed'), 201
            except Exception as error:
                db.session.rollback() ##### preguntar cual es la funcion de esto. 
                print(error.args)
                return jsonify('registry error'), 500
                
@api.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)

        login_user = User.query.filter_by(email=email).one_or_none() ### este metodo es para traer un solo usuario. //solo se verifica el email por el password esta hashed

        if login_user:
            if check_password(login_user.password, password, login_user.salt):
                ##crear el token aqui
                created_token = create_access_token(identity=login_user.id)
                ##return jsonify({'token':created_token})
                response = {"token":created_token}
                return jsonify(response)
            else:
                return jsonify('bad credential'),400

    return jsonify('todobien'),201
