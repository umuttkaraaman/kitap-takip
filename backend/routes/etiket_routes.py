from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import db, Etiket, Kullanici, Kitap

etiket_bp = Blueprint("etiket", __name__)

@etiket_bp.route("/guncelle", methods=["POST"])
@jwt_required()
def etiket_guncelle():
    data = request.get_json()
    kitap_id = data.get("kitap_id")
    etiket = data.get("etiket")
    kullanici_adi = get_jwt_identity()

    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()
    if not kullanici:
        return jsonify({"hata": "Kullanıcı bulunamadı"}), 404

    mevcut = Etiket.query.filter_by(kullanici_id=kullanici.id, kitap_id=kitap_id).first()

    if mevcut:
        mevcut.etiket = etiket
    else:
        yeni_etiket = Etiket(kullanici_id=kullanici.id, kitap_id=kitap_id, etiket=etiket)
        db.session.add(yeni_etiket)

    db.session.commit()
    return jsonify({"mesaj": "Etiket güncellendi."})

@etiket_bp.route("/kullanici-etiketleri", methods=["GET"])
@jwt_required()
def kullanici_etiketleri():
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()

    if not kullanici:
        return jsonify({"hata": "Kullanıcı bulunamadı"}), 404

    etiketler = Etiket.query.filter_by(kullanici_id=kullanici.id).all()

    sonuc = [
        {"kitap_id": et.kitap_id, "etiket": et.etiket}
        for et in etiketler
    ]

    return jsonify(sonuc), 200

