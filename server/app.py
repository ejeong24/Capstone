# server/app.py

from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, api, Resource
#from models import *insert Models*
import ipdb

CORS(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return 'Welcome to FutHut'

if __name__ == '__main__':
    app.run(port=5555)
