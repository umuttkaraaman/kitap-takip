# 📚 Kitap Takip Uygulaması

Bu proje, kullanıcıların kitapları listeleyip, etiketleyerek (okundu, okunacak, favori) takip edebileceği bir web uygulamasıdır. Admin kullanıcılar kitap ekleyebilir, diğer kullanıcılar sadece kitapları görüntüleyip etiketleyebilir.

## 🚀 Özellikler

- Kullanıcı kayıt ve giriş sistemi (JWT ile güvenli oturum yönetimi)
- Admin paneli ile kitap ekleme (sadece admin)
- Kitap listesi: kapak, başlık, yazar ve tarih bilgisi
- Etiketleme sistemi: okundu, okunacak, favori
- Etiket filtreleme
- Kendi kitaplarını görme
- Mobil uyumlu arayüz (Bootstrap ile)
- MySQL veritabanı entegrasyonu
- Flask + React mimarisi

## 🧩 Kullanılan Teknolojiler

### Backend:
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- MySQL
- CORS

### Frontend:
- React.js
- React Router DOM
- Axios
- Bootstrap

## 🔐 Giriş Bilgileri

- İlk kayıt olan kullanıcı otomatik olarak **admin** olarak atanır.
- Sonraki kullanıcılar `user` rolüyle kayıt olur.

## ⚙️ Kurulum

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python create_tables.py
python app.py
```

### 2. Frontend

```bash
npm install
npm run dev
```


## 📝 Lisans

Bu proje [MIT License](LICENSE) ile lisanslanmıştır.
