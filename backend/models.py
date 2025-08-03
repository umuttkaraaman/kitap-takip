from backend.extensions import db
from datetime import datetime

class Kullanici(db.Model):
    __tablename__ = "kullanicilar"
    id = db.Column(db.Integer, primary_key=True)
    kullanici_adi = db.Column(db.String(50), unique=True, nullable=False)
    parola = db.Column(db.String(128), nullable=False)
    rol = db.Column(db.String(10), default="kullanici")

class Kitap(db.Model):
    __tablename__ = "kitaplar"
    id = db.Column(db.Integer, primary_key=True)
    baslik = db.Column(db.String(100), nullable=False)
    yazar = db.Column(db.String(100), nullable=False)
    kapak_url = db.Column(db.String(255))
    eklenme_tarihi = db.Column(db.DateTime)
    ekleyen = db.Column(db.String(50))

class Etiket(db.Model):
    __tablename__ = "etiketler"
    id = db.Column(db.Integer, primary_key=True)
    kitap_id = db.Column(db.Integer, db.ForeignKey("kitaplar.id"), nullable=False)
    kullanici_id = db.Column(db.Integer, db.ForeignKey("kullanicilar.id"), nullable=False)
    etiket = db.Column(db.String(20), nullable=False)


