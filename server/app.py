from flask import Flask, request, session, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, api, Resource
from models import User, Squad, Player

import requests

CORS(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return 'Welcome to FutHut'

@app.route('/users/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Perform user registration logic and save to database
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return {'message': 'User registered successfully'}

@app.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Perform user login logic and session management
    # You can add your own logic here to verify the username and password
    # For demonstration purposes, let's assume the login is successful
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        session['user_id'] = user.id
        return {'message': 'User logged in successfully'}
    else:
        return {'message': 'Invalid username or password'}

@app.route('/players', methods=['GET'])
def players():
    url = 'https://futdb.app/api/players'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/players/<string:playerId>', methods=['GET'])
def players_by_id(playerId):
    url = f'https://futdb.app/api/players/{playerId}'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/squads', methods=['POST'])
def create_squad():
    data = request.get_json()
    squad_name = data.get('squad_name')
    user_id = data.get('user_id')

    # Perform squad creation logic and save to database
    squad = Squad(name=squad_name, userId=user_id)
    db.session.add(squad)
    db.session.commit()

    return {'message': 'Squad created successfully'}

@app.route('/users/<string:userID>/squads', methods=['GET'])
def get_user_squads(userID):
    user = User.query.get(userID)
    squads = [squad.serialize() for squad in user.squads]
    return {'squads': squads}

@app.route('/squads/<string:squadID>', methods=['PATCH'])
def edit_squad(squadID):
    new_squad_name = request.json['new_squad_name']

    # Perform squad editing logic and update in the database
    squad = Squad.query.get(squadID)
    squad.name = new_squad_name
    db.session.commit()

    return {'message': 'Squad edited successfully'}

@app.route('/squads/<string:squadID>', methods=['DELETE'])
def delete_squad(squadID):
    # Perform squad deletion logic in the database
    squad = Squad.query.get(squadID)
    db.session.delete(squad)
    db.session.commit()

    return {'message': 'Squad deleted successfully'}

@app.route('/users/<string:userID>/profile', methods=['DELETE'])
def delete_user_profile(userID):
    # Perform user profile deletion logic in the database
    user = User.query.get(userID)
    db.session.delete(user)
    db.session.commit()

    return {'message': 'User profile deleted successfully'}

@app.route('/users/logout', methods=['POST'])
def logout():
    # Code for user logout and session management
    session.pop('user_id', None)
    
    return {'message': 'User logged out successfully'}

if __name__ == '__main__':
    app.run(port=5555)
