import os

class Config:
    SECRET_KEY = "supersecretkey"
    SQLALCHEMY_DATABASE_URI = "mysql://root:@localhost/kitap_takip"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
