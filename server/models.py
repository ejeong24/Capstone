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
    squads = db.relationship('Squad', back_populates='user')
    
    #serialization
    serialize_rules = ('-squads.user',)
    
    #representation
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"

class Squad(db.Model, SerializerMixin):
    __tablename__ = 'squads'

    #columns
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    userId = db.Column(db.String, db.ForeignKey('users.id'))
    playerId = db.Column(db.String, db.ForeignKey('players.id'))
    
    
    #relationships
    user = db.relationship('User', back_populates='squads')
    squadPlayers = db.relationship('SquadPlayer', back_populates='squad')
    players = db.relationship('Player', secondary='squadPlayers', back_populates='squads')
    
    #serialization
    serialize_rules = ('-users.squad',)
    
    #representation
    def __repr__(self):
        return f"<Squad(id={self.id}, name='{self.name}')>"

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    #columns
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    attributes = db.Column(db.String)
    club = db.Column(db.String)
    rating = db.Column(db.Integer)
    leagueId = db.Column(db.String, db.ForeignKey('leagues.id'))
    
    #relationships
    league = db.relationship('League', back_populates='players')
    squadPlayers = db.relationship('SquadPlayer', back_populates='player')
    
    #serialization
    serialize_rules = ('-leagues.player',)
    
    #representation
    def __repr__(self):
        return f"<Player(id={self.id}, name='{self.name}', club='{self.club}')>"

    
class SquadPlayer(db.Model, SerializerMixin):
    __tablename__ = 'squadPlayers'

    #columns
    id = db.Column(db.String, primary_key=True)
    userId = db.Column(db.String, db.ForeignKey('users.id'))
    playerId = db.Column(db.String, db.ForeignKey('players.id'))
    
    #relationships
    player = db.relationship('Player', back_populates='squadPlayers')
    squads = db.relationship('Squad', back_populates='squadPlayers')
    
    #serialization
    
    
    #representation
    def __repr__(self):
        return f"<SquadPlayer(id={self.id}, userId='{self.userId}', playerId='{self.playerId}')>"


class League(db.Model, SerializerMixin):
    __tablename__ = 'leagues'

    #columns
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    clubs = db.Column(db.String)
    
    #relationships 
    players = db.relationship('Player', back_populates='league')
    
    #serialization
    serialize_rules = ('-players.league',)
    
    #representation
    def __repr__(self):
        return f"<League(id={self.id}, name='{self.name}')>"
 