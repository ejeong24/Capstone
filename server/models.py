from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin, LoginManager

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #columns
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    name = db.Column(db.String)
    platform = db.Column(db.String)
    ign = db.Column(db.String)
    bio = db.Column(db.String)
    
    #relationships
    
    
    #serialization
    
    
    #representation


class Squad(db.Model, SerializerMixin):
    __tablename__ = 'squads '

    #columns
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    userId = db.Column(db.String, db.ForeignKey('users.id'))
    playerId = db.Column(db.String, db.ForeignKey('players.id'))
    
    
    #relationships
    
    
    #serialization
    
    
    #representation


class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    #columns
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    attributes = db.Column(db.String)
    club = db.Column(db.String)
    rating = db.Column()
    leagueId = db.Column(db.String, db.ForeignKey('leagues.id'))
    
    #relationships
    
    
    #serialization
    
    
    #representation
    
    
class SquadPlayer(db.Model, SerializerMixin):
    __tablename__ = 'squadPlayers'

    #columns
    id = db.Column(db.String, primary_key=True)
    userId = db.Column(db.String, db.ForeignKey('users.id'))
    playerId = db.Column(db.String, db.ForeignKey('players.id'))
    
    #relationships
    
    
    #serialization
    
    
    #representation


class League(db.Model, SerializerMixin):
    __tablename__ = 'leagues'

    #columns
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    clubs = db.Column(db.String)
    
    #relationships 
    
    
    #serialization
    
    
    #representation
    
 