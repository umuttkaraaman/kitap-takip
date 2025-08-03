import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import KitapCard from "../components/KitapCard";
import { EtiketContext } from "../context/EtiketContext";

function Kitaplar() {
  const [kitaplar, setKitaplar] = useState([]);
  const [hata, setHata] = useState("");

  const { etiketiGuncelle } = useContext(EtiketContext);

  // Kitapları getir
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/kitaplar/")
      .then((res) => setKitaplar(res.data))
      .catch((err) => {
        console.error("Kitap getirme hatası:", err);
        setHata("Kitaplar alınırken bir hata oluştu.");
      });
  }, []);

  // Etiketleri getir (login sonrası)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    kitaplar.forEach((kitap) => {
      axios
        .get(`http://localhost:5000/api/kitaplar/etiket/${kitap.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          etiketiGuncelle(kitap.id, res.data.etiket);
        })
        .catch((err) => {
          console.error("Etiket alma hatası:", err);
        });
    });
  }, [kitaplar]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">📚 Kitap Kataloğu</h3>

      {hata && (
        <div className="alert alert-danger" role="alert">
          {hata}
        </div>
      )}

      <div className="row">
        {kitaplar.length === 0 ? (
          <p>Henüz eklenmiş kitap yok.</p>
        ) : (
          kitaplar.map((kitap) => (
            <KitapCard key={kitap.id} kitap={kitap} />
          ))
        )}
      </div>
    </div>
  );
}

export default Kitaplar;
