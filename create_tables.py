from backend.app import app
from backend.extensions import db
from backend import models
from backend.models import Kullanici, Kitap

with app.app_context():
    print("❗ Tablolar oluşturulmaya çalışılıyor...")
    db.create_all()
    print("✅ Tablolar başarıyla oluşturuldu.")
