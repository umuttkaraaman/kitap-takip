from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from backend.models import Kullanici
from backend.database import db

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/kayit", methods=["POST"])
def kayit():
    data = request.get_json()
    kullanici_adi = data.get("kullanici_adi")
    parola = data.get("parola")

    if not kullanici_adi or not parola:
        return jsonify({"hata": "Kullanıcı adı ve parola zorunludur"}), 400

    # ❗ Var mı diye kontrol
    eski = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()
    if eski:
        return jsonify({"hata": "Bu kullanıcı adı zaten mevcut."}), 409

    toplam_kullanici = Kullanici.query.count()
    rol = "admin" if toplam_kullanici == 0 else "user"

    hashed_pw = generate_password_hash(parola)
    yeni_kullanici = Kullanici(kullanici_adi=kullanici_adi, parola=hashed_pw, rol=rol)
    db.session.add(yeni_kullanici)
    db.session.commit()

    return jsonify({"mesaj": "Kayıt başarılı", "rol": rol}), 201


@auth_bp.route("/giris", methods=["POST"])
def giris():
    data = request.get_json()
    kullanici_adi = data.get("kullanici_adi")
    parola = data.get("parola")

    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()
    if not kullanici or not check_password_hash(kullanici.parola, parola):
        return jsonify({"hata": "Geçersiz giriş"}), 401

    token = create_access_token(identity=kullanici.kullanici_adi)
    return jsonify({"token": token, "rol": kullanici.rol}), 200
