from flask import Flask, request, session, make_response, jsonify, Response
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, api, Resource
from models import User, Squad, Player, League, SquadPlayer

import requests

CORS(app)
migrate = Migrate(app, db)


@app.route('/squad_players/<int:squadID>', methods=['GET'])
def get_squad_players(squadID):
    try:
        squad_players = []
        this_squad_players = SquadPlayer.query.filter_by(
            squad_id=squadID).all()
        if this_squad_players:
            for squad_player in this_squad_players:
                squad_player_data = {
                    'id': squad_player.id,
                    'player_id': squad_player.player_id
                }
                squad_players.append(squad_player_data)
            return jsonify(squad_players), 200
        else:
            return jsonify([{'message': 'Squad not found'}]), 404
    except Exception as e:
        return jsonify({'message': 'Error retrieving squad players'}), 500


@app.route('/users/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    user = User(username=username, firstName=firstName,
                lastName=lastName, email=email, password=password)
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

    leagues = [{'id': league['id'], 'name': league['name']}
               for league in data['items']]

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
        'resourceId': player['resourceId'],
        'resourceBaseId': player['resourceBaseId'],
        'futBinId': player['futBinId'],
        'futWizId': player['futWizId'],
        'firstName': player['firstName'],
        'lastName': player['lastName'],
        'name': player['name'],
        'commonName': player['commonName'],
        'height': player['height'],
        'weight': player['weight'],
        'birthDate': player['birthDate'],
        'age': player['age'],
        'league': player['league'],
        'nation': player['nation'],
        'club': player['club'],
        'rarity': player['rarity'],
        'traits': player['traits'],
        'specialities': player['specialities'],
        'position': player['position'],
        'skillMoves': player['skillMoves'],
        'weakFoot': player['weakFoot'],
        'foot': player['foot'],
        'attackWorkRate': player['attackWorkRate'],
        'defenseWorkRate': player['defenseWorkRate'],
        'totalStats': player['totalStats'],
        'totalStatsInGame': player['totalStatsInGame'],
        'color': player['color'],
        'rating': player['rating'],
        'ratingAverage': player['ratingAverage'],
        'pace': player['pace'],
        'shooting': player['shooting'],
        'passing': player['passing'],
        'dribbling': player['dribbling'],
        'defending': player['defending'],
        'physicality': player['physicality'],
        'paceAttributes': player['paceAttributes'],
        'shootingAttributes': player['shootingAttributes'],
        'passingAttributes': player['passingAttributes'],
        'dribblingAttributes': player['dribblingAttributes'],
        'defendingAttributes': player['defendingAttributes'],
        'physicalityAttributes': player['physicalityAttributes'],
        'goalkeeperAttributes': player['goalkeeperAttributes'],
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


@app.route('/players/<string:playerId>', methods=['GET'])
def players_by_id(playerId):
    url = f'https://futdb.app/api/players/{playerId}'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    return response.json()


@app.route('/players/<string:playerId>/image', methods=['GET'])
def player_images_by_id(playerId):
    url = f'https://futdb.app/api/players/{playerId}/image'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        image_data = response.content
        return Response(image_data, mimetype='image/png')
    else:
        return Response(response.text, status=response.status_code, mimetype='application/json')


@app.route('/rarities/<int:rarityId>/image', methods=['GET'])
def player_bg_by_id(rarityId):
    url = f'https://futdb.app/api/rarities/{rarityId}/image'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        image_data = response.content
        return Response(image_data, mimetype='image/png')
    else:

        default_url = 'https://futdb.app/api/rarities/163/image'
        default_response = requests.get(default_url, headers=headers)

        if default_response.status_code == 200:
            default_image_data = default_response.content
            return Response(default_image_data, mimetype='image/png')
        else:

            return Response('Image not found', status=404)


@app.route('/users/<int:user_id>/squads/activeSquad', methods=['GET'])
def get_active_squad(user_id):
    try:
        squad = Squad.query.filter_by(user_id=user_id, active=True).first()
        if squad:
            squad_data = {
                'active': squad.active,
                'id': squad.id,
                'name': squad.name
            }
            return jsonify(squad_data)
        else:
            return jsonify({'message': 'No squad found for this user.'}), 404
    except Exception as e:
        return {'message': 'Error retrieving active squad'}, 500


@app.route('/users/<int:user_id>/squads/<int:squad_id>/setActive', methods=['POST'])
def set_active_squad(user_id, squad_id):

    Squad.query.filter(Squad.user_id == user_id).update({Squad.active: False})
    squad = Squad.query.filter_by(id=squad_id, user_id=user_id).first()
    if squad:
        squad.active = True
        db.session.commit()
        return {'message': 'Active squad set successfully'}
    else:
        return {'error': 'Squad not found'}, 404


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
    squad_player = SquadPlayer.query.filter_by(
        squad_id=squad_id, player_id=player_id).first()
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
                'name': squad.name,
                'active': squad.active
            }
            squads.append(squad_data)
        return jsonify(squads)
    except Exception as e:
        return {'message': 'Error retrieving user squads'}, 500


@app.route('/squads/<int:squadID>/edit', methods=['PATCH'])
def edit_squad(squadID):
    new_squad_name = request.json['new_squad_name']

    squad = Squad.query.get(squadID)
    squad.name = new_squad_name
    db.session.commit()

    return {'message': 'Squad edited successfully'}


@app.route('/squads/<int:squadID>/delete', methods=['DELETE'])
def delete_squad(squadID):

    squad = Squad.query.get(squadID)
    if squad:
        try:
            db.session.delete(squad)
            db.session.commit()
            return {'message': 'Squad deleted successfully'}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
    else:
        return {"error": f"No squad found with id {squadID}"}, 404


@app.route('/users/<int:userID>/profile', methods=['DELETE'])
def delete_user_profile(userID):

    user = User.query.get(userID)
    db.session.delete(user)
    db.session.commit()

    return {'message': 'User profile deleted successfully'}


@app.route('/users/<int:userID>/profile', methods=['GET'])
def get_user_profile(userID):

    user = User.query.get(userID)

    if not user:
        return {'message': 'User not found'}, 404

    profile_data = {
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email
    }

    return profile_data


@app.route('/users/<int:userID>/profile', methods=['PATCH'])
def update_user_profile(userID):
    user = User.query.get(userID)
    if not user:
        return {'message': 'User not found'}, 404
    data = request.get_json()
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
    db.session.commit()

    updated_profile_data = {
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email
    }

    return updated_profile_data, 200


@app.route('/')
def index():
    return 'Welcome to FutHut'


if __name__ == '__main__':
    app.run(port=5555)
