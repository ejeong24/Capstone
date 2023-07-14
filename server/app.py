from flask import Flask, request, session, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, api, Resource
from models import User, Squad, Player, League, SquadPlayer

import requests

CORS(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return 'Welcome to FutHut'


@app.route('/squad_players/<int:squadID>', methods=['GET'])
def get_squad_players(squadID):
    try:
        squad_players = []
        this_squad_players = SquadPlayer.query.filter_by(squad_id=squadID).all()
        if this_squad_players:
            for squad_player in this_squad_players:
                # player = Player.query.filter_by(id=squad_player.id).first()
                squad_player_data = {
                    'id': squad_player.id,
                    'player_id': squad_player.player_id
                    # 'player_name': player.name if player else None
                    # Add more squad player details as needed
                }
                squad_players.append(squad_player_data)
            return jsonify(squad_players), 200
        else:
            return jsonify({'message': 'Squad not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error retrieving squad players'}), 500

    #     if squad:
    #         squad_players = squad.squad_players
    #         squad_players_data = [{
    #             'id': squad_player.id,
    #             'player_id': squad_player.player_id,
    #             'player_name': squad_player.player.name
    #             # Add more squad player details as needed
    #         } for squad_player in squad_players]

    #         return jsonify(squad_players_data), 200
    #     else:
    #         return jsonify({'message': 'Squad not found'}), 404
    # except Exception as e:
    #     return jsonify({'message': 'Error retrieving squad players'}), 500
        return {squad_players};

@app.route('/users/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Perform user registration logic and save to database
    user = User(username=username, firstName=firstName, lastName=lastName, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return {'message': 'User registered successfully', 'id': user.id}

@app.route('/leagues', methods=['GET'])
def leagues():
    page = request.args.get('page', default=1, type=int)
    url = f'https://futdb.app/api/leagues?page={page}'

    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    leagues = [{'id': league['id'], 'name': league['name']} for league in data['items']]

    pagination = {
        'countCurrent': data['pagination']['countCurrent'],
        'countTotal': data['pagination']['countTotal'],
        'pageCurrent': data['pagination']['pageCurrent'],
        'pageTotal': data['pagination']['pageTotal'],
        'itemsPerPage': data['pagination']['itemsPerPage']
    }

    result = {
        'leagues': leagues,
        'pagination': pagination
    }

    return jsonify(result)



@app.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    id = data.get('id')
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username, password=password).first()
    if user:
        session['user_id'] = user.id
        return {
            'message': 'User logged in successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'password': user.password
            }
        }
    else:
        return {'message': 'Invalid username or password'}
    
    
@app.route('/users/logout', methods=['POST'])
def logout():
    # Code for user logout and session management
    session.pop('user_id', None)
    
    return {'message': 'User signed out successfully'}


@app.route('/players', methods=['GET'])
def players():
    page = request.args.get('page', default=1, type=int)
    url = f'https://futdb.app/api/players?page={page}'

    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }

    response = requests.get(url, headers=headers)

    data = response.json()
    players = [{
        'id': player['id'],
        'name': player['name'],
        'resourceId': player['resourceId'],
        'league': player['league']
    } for player in data['items']]

    pagination = {
        'countCurrent': data['pagination']['countCurrent'],
        'countTotal': data['pagination']['countTotal'],
        'pageCurrent': data['pagination']['pageCurrent'],
        'pageTotal': data['pagination']['pageTotal'],
        'itemsPerPage': data['pagination']['itemsPerPage']
    }

    result = {
        'players': players,
        'pagination': pagination
    }

    return jsonify(result)


@app.route('/players/search', methods=['POST'])
def search_players():
    league_id = request.json.get('league')

    url = 'https://futdb.app/api/players/search'
    headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7',
        'Content-Type': 'application/json'
    }
    body = {
        'league': league_id
    }
    response = requests.post(url, headers=headers, json=body)
    if response.status_code == 200:
        data = response.json()
        pagination = data['pagination']
        players = data['items']
        result = {
            'pagination': pagination,
            'players': players
        }
        return jsonify(result)
    else:
        return jsonify(error='API request failed'), 400



@app.route('/players/<string:playerId>', methods=['GET'])
def players_by_id(playerId):
    url = f'https://futdb.app/api/players/{playerId}'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/users/<int:user_id>/squads/activeSquad', methods=['GET'])
def get_active_squad(user_id):
    try:
        squad = Squad.query.filter_by(user_id=user_id).first()
        if squad:
            squad_data = {
                'id': squad.id,
                'name': squad.name
            }
            return jsonify(squad_data)
        else:
            return jsonify({'message': 'No squad found for this user.'}), 404
    except Exception as e:
        return {'message': 'Error retrieving active squad'}, 500


@app.route('/users/<int:user_id>/squads/<int:squad_id>/add-player', methods=['POST'])
def add_player_to_squad(user_id, squad_id):
    player_id = request.json.get('player_id')
    if not player_id:
        return {'error': 'Player ID is required'}, 400
    if not user_id:
        return {'error': 'User ID is required'}, 400

    new_squad_player = SquadPlayer(squad_id=squad_id, player_id=player_id)
    db.session.add(new_squad_player)
    db.session.commit()

    return {'message': 'Player added to squad successfully'}, 200

@app.route('/users/squads/<int:squad_id>/delete-player', methods=['POST'])
def delete_player_from_squad(squad_id):
    player_id = request.json.get('player_id')
    if not player_id:
        return {'error': 'Player ID is required'}, 400
    # if not user_id:
    #     return {'error': 'User ID is required'}, 400
    
    # Perform player deletion logic from the squad
    squad_player = SquadPlayer.query.filter_by(squad_id=squad_id, player_id=player_id).first()
    if squad_player:
        db.session.delete(squad_player)
        db.session.commit()
        return {'message': 'Player deleted from squad successfully'}
    else:
        return {'error': 'Player not found in the squad'}, 404

@app.route('/squads', methods=['POST'])
def create_squad():
    data = request.get_json()
    squad_name = data.get('squad_name')
    user_id = data.get('user_id')

    # Perform squad creation logic and save to database
    squad = Squad(name=squad_name, user_id=user_id)
    db.session.add(squad)
    db.session.commit()

    return {'message': 'Squad created successfully'}

@app.route('/users/<int:userID>/squads', methods=['GET'])
def get_user_squads(userID):
    try:
        squads = []
        for squad in Squad.query.filter(Squad.user_id == userID):
            squad_data = {
                'id': squad.id,
                'name': squad.name
            }
            squads.append(squad_data)
        return jsonify(squads)
    except Exception as e:
        return {'message': 'Error retrieving user squads'}, 500
        

@app.route('/squads/<int:squadID>/edit', methods=['PATCH'])
def edit_squad(squadID):
    new_squad_name = request.json['new_squad_name']

    # Perform squad editing logic and update in the database
    squad = Squad.query.get(squadID)
    squad.name = new_squad_name
    db.session.commit()

    return {'message': 'Squad edited successfully'}

@app.route('/squads/<int:squadID>/delete', methods=['DELETE'])
def delete_squad(squadID):
    # Perform squad deletion logic in the database
    squad = Squad.query.get(squadID)
    if squad:
        try:
            db.session.delete(squad)
            db.session.commit()
            return {'message': 'Squad deleted successfully'}
        except Exception as e:
            db.session.rollback()  # rollback the changes on error
            return {"error": str(e)}, 500  # return the error message
    else:
        return {"error": f"No squad found with id {squadID}"}, 404


@app.route('/users/<int:userID>/profile', methods=['DELETE'])
def delete_user_profile(userID):
    # Perform user profile deletion logic in the database
    user = User.query.get(userID)
    db.session.delete(user)
    db.session.commit()

    return {'message': 'User profile deleted successfully'}

@app.route('/users/<int:userID>/profile', methods=['GET'])
def get_user_profile(userID):
    # Retrieve the user profile from the database
    user = User.query.get(userID)

    # Check if the user exists
    if not user:
        return {'message': 'User not found'}, 404

    # Prepare the user profile data to be sent as the response
    profile_data = {
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email
        # Add more profile data fields as needed
    }

    return profile_data

@app.route('/users/<int:userID>/profile', methods=['PATCH'])
def update_user_profile(userID):
    # Get the user by userID
    user = User.query.get(userID)

    # Check if the user exists
    if not user:
        return {'message': 'User not found'}, 404

    # Get the request data
    data = request.get_json()

    # Update the user fields
    if 'username' in data:
        user.username = data['username']
    if 'firstName' in data:
        user.firstName = data['firstName']
    if 'lastName' in data:
        user.lastName = data['lastName']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password = data['password']

    # Commit the changes to the database
    db.session.commit()

    # Prepare the updated user profile data to be sent as the response
    updated_profile_data = {
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email
        # Add more profile data fields as needed
    }

    return updated_profile_data, 200


if __name__ == '__main__':
    app.run(port=5555)
