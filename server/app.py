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

@app.route('/players', methods=['GET'])
def get_players():
    url = 'https://futdb.app/api/players'
    headers = {
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7'
    }
    response = requests.get(url, headers=headers)
    return response.content

if __name__ == '__main__':
    app.run(port=5555)