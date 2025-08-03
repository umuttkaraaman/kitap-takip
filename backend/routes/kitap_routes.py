from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import Kitap, Kullanici
from backend.database import db
from flask import jsonify
from backend.models import Etiket


kitap_bp = Blueprint("kitap_bp", __name__)

@kitap_bp.route("/ekle", methods=["POST"])
@jwt_required()
def kitap_ekle():
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()

    if kullanici.rol != "admin":
        return jsonify({"hata": "Sadece admin kitap ekleyebilir"}), 403

    data = request.get_json()
    baslik = data.get("baslik")
    yazar = data.get("yazar")
    kapak_url = data.get("kapak_url")

    if not baslik or not yazar:
        return jsonify({"hata": "Başlık ve yazar zorunlu"}), 400

    yeni_kitap = Kitap(
        baslik=baslik,
        yazar=yazar,
        kapak_url=kapak_url,
        ekleyen_id=kullanici.id
    )
    db.session.add(yeni_kitap)
    db.session.commit()
    return jsonify({"mesaj": "Kitap başarıyla eklendi"}), 201

@kitap_bp.route("/", methods=["GET"])
@jwt_required()
def kitaplari_getir():
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()

    if not kullanici:
        return jsonify({"hata": "Kullanıcı bulunamadı"}), 404

    kitaplar = Kitap.query.all()
    etiketler = Etiket.query.filter_by(kullanici_id=kullanici.id).all()

    # kitap_id -> etiket şeklinde map
    etiket_map = {e.kitap_id: e.etiket for e in etiketler}

    kitap_listesi = []
    for kitap in kitaplar:
        kitap_listesi.append({
            "id": kitap.id,
            "baslik": kitap.baslik,
            "yazar": kitap.yazar,
            "kapak_url": kitap.kapak_url,
            "eklenme_tarihi": kitap.eklenme_tarihi.strftime("%Y-%m-%d") if kitap.eklenme_tarihi else None,
            "ekleyen": kitap.ekleyen.kullanici_adi if kitap.ekleyen else None,
            "etiket": etiket_map.get(kitap.id, "")  # Kullanıcıya ait etiket varsa ekle
        })

    return jsonify(kitap_listesi), 200


@kitap_bp.route("/benim", methods=["GET"])
@jwt_required()
def kendi_kitaplarim():
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()
    kitaplar = Kitap.query.filter_by(ekleyen_id=kullanici.id).all()

    kitap_listesi = []
    for kitap in kitaplar:
        kitap_listesi.append({
            "id": kitap.id,
            "baslik": kitap.baslik,
            "yazar": kitap.yazar,
            "kapak_url": kitap.kapak_url,
            "eklenme_tarihi": kitap.eklenme_tarihi.strftime("%Y-%m-%d")
        })
    return jsonify(kitap_listesi), 200

@kitap_bp.route("/etiket/<int:kitap_id>", methods=["GET"])
@jwt_required()
def kitap_etiketi_getir(kitap_id):
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()

    if not kullanici:
        return jsonify({"hata": "Kullanıcı bulunamadı"}), 404

    etiket = Etiket.query.filter_by(kullanici_id=kullanici.id, kitap_id=kitap_id).first()

    if not etiket:
        return jsonify({"etiket": ""})  # Etiket yoksa boş döneriz

    return jsonify({"etiket": etiket.etiket})

@kitap_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def kitap_sil(id):
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()

    kitap = Kitap.query.filter_by(id=id).first()
    if not kitap:
        return jsonify({"hata": "Kitap bulunamadı"}), 404

    # Sadece admin veya kitabı ekleyen kişi silebilir
    if kullanici.rol != "admin" and kitap.ekleyen_id != kullanici.id:
        return jsonify({"hata": "Bu kitabı silme yetkiniz yok"}), 403

    db.session.delete(kitap)
    db.session.commit()
    return jsonify({"mesaj": "Kitap başarıyla silindi."}), 200

@kitap_bp.route("/<int:kitap_id>", methods=["PUT"])
@jwt_required()
def kitap_guncelle(kitap_id):
    kullanici_adi = get_jwt_identity()
    kullanici = Kullanici.query.filter_by(kullanici_adi=kullanici_adi).first()
    kitap = Kitap.query.get_or_404(kitap_id)

    # Sadece admin ya da kitabı ekleyen kullanıcı güncelleyebilir
    if not (kullanici.rol == "admin" or kitap.ekleyen_id == kullanici.id):
        return jsonify({"hata": "Yetkiniz yok"}), 403

    data = request.get_json()
    kitap.baslik = data.get("baslik", kitap.baslik)
    kitap.yazar = data.get("yazar", kitap.yazar)
    kitap.kapak_url = data.get("kapak_url", kitap.kapak_url)

    db.session.commit()
    return jsonify({"mesaj": "Kitap güncellendi"}), 200
