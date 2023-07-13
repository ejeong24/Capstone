from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin, LoginManager

from config import db

class User(UserMixin, db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    squads = db.relationship('Squad', back_populates='user')
    serialize_rules = ('-squads.user',)
    
    @validates('username')
    def validate_username(self, username):
        if not username:
            raise ValueError("Username is required")
        if len(username) < 3 or len(username) > 50:
            raise ValueError("Username must be between 3 and 50 characters")
        return username
    
    @validates('password')
    def validate_password(self, password):
        if not password:
            raise ValueError("Password is required")
        if len(password) < 6:
            raise ValueError("Password must be at least 6 characters")
        return password

    def __repr__(self):
        return f'<User(id={self.id}, username={self.username}, email={self.email})>'      


class Squad(db.Model, SerializerMixin):
    __tablename__ = 'squads'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    user = db.relationship('User', back_populates='squads')
    squad_players = db.relationship('SquadPlayer', back_populates='squad', cascade='all, delete-orphan')
    players = association_proxy('squad_players', 'player')
    
    serialize_rules = ('-user.squads',)
    
    @validates('name')
    def validate_name(self, name):
        if not name:
            raise ValueError('Squad name cannot be empty')
        return name

    def __repr__(self):
        return f'<Squad(id={self.id}, name={self.name}, user_id={self.user_id})>'

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    attributes = db.Column(db.String(255), nullable=False)
    club = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    league = db.relationship('League', back_populates='players')

    squad_players = db.relationship('SquadPlayer', back_populates='player')
    serialize_rules = ('-league.players',)

    def __repr__(self):
        return f'<Player(id={self.id}, name={self.name}, club={self.club}, league_id={self.league_id})>'

class League(db.Model, SerializerMixin):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    clubs = db.Column(db.String(255), nullable=False)

    players = db.relationship('Player', back_populates='league')
    serialize_rules = ('-players.league',)
    
    def __repr__(self):
        return f'<League(id={self.id}, name={self.name}, clubs={self.clubs})>'

class SquadPlayer(db.Model, SerializerMixin):
    __tablename__ = 'squad_players'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    squad_id = db.Column(db.Integer, db.ForeignKey('squads.id', ondelete='CASCADE'), nullable=False)

    squad = db.relationship('Squad', back_populates='squad_players')
    player = db.relationship('Player', back_populates='squad_players')
    
    serialize_rules = ('-squad.squad_players', '-player.squad_players',)
    
    def __repr__(self):
        return f'<SquadPlayer(id={self.id}, squad_id={self.squad_id}, player_id={self.player_id})>'