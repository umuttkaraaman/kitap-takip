import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KitapDuzenle() {
  const { kitapId } = useParams();
  const navigate = useNavigate();
  const [kitap, setKitap] = useState({ baslik: "", yazar: "", kapak_url: "" });
  const [hata, setHata] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/kitaplar/")
      .then(res => {
        const hedefKitap = res.data.find(k => k.id === parseInt(kitapId));
        if (hedefKitap) setKitap(hedefKitap);
        else setHata("Kitap bulunamadı.");
      })
      .catch(() => setHata("Kitap bilgisi alınamadı."));
  }, [kitapId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/kitaplar/${kitapId}`, kitap, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch {
      setHata("Güncelleme başarısız.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Kitap Güncelle</h2>
      {hata && <div className="alert alert-danger">{hata}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Başlık</label>
          <input
            type="text"
            className="form-control"
            value={kitap.baslik}
            onChange={(e) => setKitap({ ...kitap, baslik: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Yazar</label>
          <input
            type="text"
            className="form-control"
            value={kitap.yazar}
            onChange={(e) => setKitap({ ...kitap, yazar: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Kapak URL</label>
          <input
            type="url"
            className="form-control"
            value={kitap.kapak_url}
            onChange={(e) => setKitap({ ...kitap, kapak_url: e.target.value })}
          />
        </div>
        <button className="btn btn-success w-100">Kaydet</button>
      </form>
    </div>
  );
}
