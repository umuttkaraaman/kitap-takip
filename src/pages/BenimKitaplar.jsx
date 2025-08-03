import React, { useEffect, useState } from "react";
import axios from "axios";
import KitapCard from "../components/KitapCard";
import { useAuth } from "../context/AuthContext";

const BenimKitaplar = () => {
  const [kitaplar, setKitaplar] = useState([]);
  const [hata, setHata] = useState("");
  const { kullanici } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/kitaplar/benim", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setKitaplar(res.data))
      .catch((err) => {
        console.error(err);
        setHata("Kitaplar alınırken bir hata oluştu.");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">📕 Benim Eklediğim Kitaplar</h3>

      {hata && <div className="alert alert-danger">{hata}</div>}

      <div className="row">
        {kitaplar.length === 0 ? (
          <p>Henüz kitap eklememişsiniz.</p>
        ) : (
          kitaplar.map((kitap) => (
            <KitapCard key={kitap.id} kitap={kitap} />
          ))
        )}
      </div>
    </div>
  );
};

export default BenimKitaplar;
