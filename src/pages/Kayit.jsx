import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Kayit = () => {
  const navigate = useNavigate();
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [parola, setParola] = useState("");
  const [hata, setHata] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHata("");
    setMesaj("");
    setYukleniyor(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/kayit", {
        kullanici_adi: kullaniciAdi.trim(),
        parola: parola.trim(),
      });
      setMesaj(res.data.mesaj);
      setTimeout(() => navigate("/giris"), 1500);
    } catch (err) {
      setHata(err.response?.data?.hata || "Kayıt başarısız.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Kayıt Ol</h2>
      {hata && <div className="alert alert-danger">{hata}</div>}
      {mesaj && <div className="alert alert-success">{mesaj}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="kullaniciAdi" className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            id="kullaniciAdi"
            className="form-control"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="parola" className="form-label">Parola</label>
          <input
            type="password"
            id="parola"
            className="form-control"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" disabled={yukleniyor}>
          {yukleniyor ? "Kayıt olunuyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
};

export default Kayit;
