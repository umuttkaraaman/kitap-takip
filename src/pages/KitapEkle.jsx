import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function KitapEkle() {
  const { kullanici } = useAuth();
  const navigate = useNavigate();

  const [kitapAdi, setKitapAdi] = useState("");
  const [yazar, setYazar] = useState("");
  const [kapakUrl, setKapakUrl] = useState("");
  const [hata, setHata] = useState("");
  const [mesaj, setMesaj] = useState("");

  // Admin değilse anasayfaya yönlendir
  if (!kullanici || kullanici.rol !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHata("");
    setMesaj("");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/kitaplar/ekle",
        {
          baslik: kitapAdi,
          yazar: yazar,
          kapak_url: kapakUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMesaj("Kitap başarıyla eklendi!");
      setKitapAdi("");
      setYazar("");
      setKapakUrl("");

      setTimeout(() => navigate("/kitaplar"), 1500);
    } catch (err) {
      console.error(err);
      setHata("Kitap eklenemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Yeni Kitap Ekle</h2>
      {hata && <p className="text-danger text-center">{hata}</p>}
      {mesaj && <p className="text-success text-center">{mesaj}</p>}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label className="form-label">Kitap Adı</label>
          <input
            type="text"
            className="form-control"
            value={kitapAdi}
            onChange={(e) => setKitapAdi(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Yazar</label>
          <input
            type="text"
            className="form-control"
            value={yazar}
            onChange={(e) => setYazar(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kapak Fotoğrafı URL</label>
          <input
            type="url"
            className="form-control"
            value={kapakUrl}
            onChange={(e) => setKapakUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Kitap Ekle
        </button>
      </form>
    </div>
  );
}
