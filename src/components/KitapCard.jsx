import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEtiket } from "../context/EtiketContext";
import { useNavigate } from "react-router-dom";

const KitapCard = ({ kitap }) => {
  const navigate = useNavigate();
  const { kullanici } = useAuth();
  const { etiketDurumu, etiketiGuncelle } = useEtiket();
  const [aktifEtiket, setAktifEtiket] = useState("");

  // Etiketleri backend'den çek
  useEffect(() => {
    if (!kullanici) return;
    axios
      .get(`http://localhost:5000/api/kitaplar/etiket/${kitap.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        etiketiGuncelle(kitap.id, res.data.etiket);
        setAktifEtiket(res.data.etiket);
      })
      .catch(() => {
        etiketiGuncelle(kitap.id, "");
        setAktifEtiket("");
      });
  }, [kitap.id, kullanici]);

  const etiketDegistir = async (yeniEtiket) => {
    try {
      await axios.post(
        "http://localhost:5000/api/etiket/guncelle",
        {
          kitap_id: kitap.id,
          etiket: yeniEtiket,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      etiketiGuncelle(kitap.id, yeniEtiket);
      setAktifEtiket(yeniEtiket);
    } catch (err) {
      console.error("Etiket güncellenemedi", err);
    }
  };

  const handleSil = async () => {
    if (!window.confirm("Bu kitabı silmek istediğinize emin misiniz?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/kitaplar/${kitap.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload(); // sayfayı yenile
    } catch (err) {
      console.error("Silme işlemi başarısız:", err);
    }
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={kitap.kapak_url}
          alt={kitap.baslik}
          className="card-img-top"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-cover.jpg"; // 📁 public klasörüne bu görseli ekle
          }}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{kitap.baslik}</h5>
          <p className="card-text">Yazar: {kitap.yazar}</p>
          <p className="card-text">Tarih: {kitap.eklenme_tarihi || "Bilinmiyor"}</p>
          {kitap.ekleyen && (
            <p className="text-muted">Ekleyen: {kitap.ekleyen}</p>
          )}

          {/* Etiket butonları */}
          {kullanici && (
            <div className="btn-group mt-2" role="group">
              {["okundu", "okunacak", "favori"].map((etiket) => (
                <button
                  key={etiket}
                  className={`btn btn-sm btn-${
                    aktifEtiket === etiket
                      ? etiket === "okundu"
                        ? "success"
                        : etiket === "okunacak"
                        ? "warning"
                        : "danger"
                      : "outline-secondary"
                  }`}
                  onClick={() => etiketDegistir(etiket)}
                >
                  {etiket.charAt(0).toUpperCase() + etiket.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Güncelle/Sil butonları sadece admin ya da ekleyen kişiye görünür */}
          {kullanici && (kullanici.rol === "admin" || kitap.ekleyen === kullanici.kullaniciAdi) && (
            <>
              <button
                className="btn btn-warning btn-sm mt-2"
                onClick={() => navigate(`/kitap-duzenle/${kitap.id}`)}
              >
                Güncelle
              </button>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={handleSil}
              >
                Sil
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitapCard;
