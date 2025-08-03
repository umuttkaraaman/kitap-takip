from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from backend.extensions import db
from backend.routes.kitap_routes import kitap_bp
from backend.routes.auth_routes import auth_bp
from backend.routes.etiket_routes import etiket_bp

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:root@localhost:8889/kitap_takip"
app.config["JWT_SECRET_KEY"] = "gizliAnahtar"

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(kitap_bp, url_prefix="/api/kitaplar")
app.register_blueprint(etiket_bp, url_prefix="/api/etiketler")

@app.route("/")
def anasayfa():
    return {"mesaj": "Kitap Takip API çalışıyor."}

if __name__ == "__main__":
    from backend.models import *  # modeller buraya taşınacak
    with app.app_context():
        db.create_all()
    app.run(debug=True)
