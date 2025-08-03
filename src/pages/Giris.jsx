import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const { girisYap } = useAuth();
  const navigate = useNavigate();

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [parola, setParola] = useState("");
  const [hata, setHata] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHata("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/giris", {
        kullanici_adi: kullaniciAdi,
        parola,
      });

      const { token, rol } = res.data;
      girisYap(kullaniciAdi, token, rol);
      navigate("/kitaplar"); // Giriş sonrası kitap sayfasına yönlendirme
    } catch (err) {
      setHata("Giriş başarısız. Bilgileri kontrol et.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Giriş Yap</h2>
      {hata && <p className="text-danger">{hata}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="kullaniciAdi">Kullanıcı Adı</label>
          <input
            id="kullaniciAdi"
            type="text"
            className="form-control"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="parola">Parola</label>
          <input
            id="parola"
            type="password"
            className="form-control"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Giris;
