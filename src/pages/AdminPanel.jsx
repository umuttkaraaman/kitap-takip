import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { kullanici } = useAuth();
  const navigate = useNavigate();

  const [baslik, setBaslik] = useState("");
  const [yazar, setYazar] = useState("");
  const [kapak, setKapak] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [hata, setHata] = useState("");

  // Sadece admin yetkilidir
  if (!kullanici || kullanici.rol !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMesaj("");
    setHata("");

    if (!baslik || !yazar) {
      setHata("Başlık ve yazar zorunlu");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/kitaplar/ekle",
        {
          baslik,
          yazar,
          kapak_url: kapak,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMesaj("Kitap başarıyla eklendi!");
      setBaslik("");
      setYazar("");
      setKapak("");
    } catch (err) {
      console.error(err);
      setHata("Kitap eklenirken bir hata oluştu.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Yeni Kitap Ekle (Admin Paneli)</h2>

      {mesaj && <div className="alert alert-success">{mesaj}</div>}
      {hata && <div className="alert alert-danger">{hata}</div>}

      <form onSubmit={handleSubmit} className="card card-body p-4 shadow">
        <input
          type="text"
          placeholder="Kitap Başlığı"
          value={baslik}
          onChange={(e) => setBaslik(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="Yazar"
          value={yazar}
          onChange={(e) => setYazar(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="Kapak URL"
          value={kapak}
          onChange={(e) => setKapak(e.target.value)}
          className="form-control mb-3"
        />
        <button className="btn btn-primary">Kitap Ekle</button>
      </form>
    </div>
  );
}
