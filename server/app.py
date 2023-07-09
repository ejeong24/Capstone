# server/app.py

from flask import Flask, request, session, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, api, Resource
#from models import *insert Models*
import ipdb
import requests

CORS(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return 'Welcome to FutHut'

@app.route('/users/register', methods=['POST'])
def register():
    # Code for user registration
    # Access request data using request.json or request.form
    # Example:
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    # Perform user registration logic and save to database
    # Return appropriate response or JSON data
    return jsonify({'message': 'User registered successfully'})

@app.route('/users/login', methods=['POST'])
def login():
    # Code for user login
    # Access request data using request.json or request.form
    # Example:
    username = request.json['username']
    password = request.json['password']
    # Perform user login logic and session management
    # Return appropriate response or JSON data
    return jsonify({'message': 'User logged in successfully'})

@app.route('/players', methods=['GET'])
def players():
    # Code to fetch list of players from the FutDB API
    # Example:
    url = 'https://futdb.app/api/players'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    # Process the response and return appropriate data
    return response.content

@app.route('/players/<string:playerId>', methods=['GET'])
def players_by_id(playerId):
    # Code to fetch details of a specific player by ID from the FutDB API
    # Example:
    url = f'https://futdb.app/api/players/{playerId}'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    # Process the response and return appropriate data
    return response.content

@app.route('/squads', methods=['POST'])
def create_squad():
    # Code to create a new squad
    # Access request data using request.json or request.form
    # Example:
    squad_name = request.json['squad_name']
    # Perform squad creation logic and save to database
    # Return appropriate response or JSON data
    return jsonify({'message': 'Squad created successfully'})

@app.route('/users/<string:userID>/squads', methods=['GET'])
def get_user_squads(userID):
    # Code to fetch squads for a specific user
    # Perform database query to retrieve user's squads
    # Return appropriate response or JSON data
    return jsonify({'squads': []})

@app.route('/squads/<string:squadID>', methods=['PATCH'])
def edit_squad(squadID):
    # Code to edit an existing squad
    # Access request data using request.json or request.form
    # Example:
    new_squad_name = request.json['new_squad_name']
    # Perform squad editing logic and update in the database
    # Return appropriate response or JSON data
    return jsonify({'message': 'Squad edited successfully'})

@app.route('/squads/<string:squadID>', methods=['DELETE'])
def delete_squad(squadID):
    # Code to delete an existing squad
    # Perform squad deletion logic in the database
    # Return appropriate response or JSON data
    return jsonify({'message': 'Squad deleted successfully'})

@app.route('/users/<string:userID>/profile', methods=['DELETE'])
def delete_user_profile(userID):
    # Code to delete a user's profile
    # Perform user profile deletion logic in the database
    # Return appropriate response or JSON data
    return jsonify({'message': 'User profile deleted successfully'})

@app.route('/users/logout', methods=['POST'])
def logout():
    # Code for user logout and session management
    # Return appropriate response or JSON data
    return jsonify({'message': 'User logged out successfully'})

if __name__ == '__main__':
    app.run(port=5555)