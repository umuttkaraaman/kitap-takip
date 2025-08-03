import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EtiketContext } from "../context/EtiketContext";
import KitapCard from "../components/KitapCard";

const Home = () => {
  const { kullanici } = useAuth();
  const { kitaplar, etiketDurumu, filtreleEtiket } = useContext(EtiketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!kullanici) {
      navigate("/giris");
    }
  }, [kullanici]);

  if (!kullanici) return null;

  const filtrelenmisKitaplar = kitaplar.filter((kitap) => {
    if (etiketDurumu === "hepsi") return true;
    return kitap.etiket === etiketDurumu;
  });

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">
        <span role="img" aria-label="kitap">📚</span> Kitap Kataloğu
      </h2>
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => filtreleEtiket("hepsi")}>Hepsi</button>
        <button className="btn btn-success me-2" onClick={() => filtreleEtiket("okundu")}>Okundu</button>
        <button className="btn btn-warning me-2" onClick={() => filtreleEtiket("okunacak")}>Okunacak</button>
        <button className="btn btn-danger" onClick={() => filtreleEtiket("favori")}>Favori</button>
      </div>

      {filtrelenmisKitaplar.length === 0 ? (
        <p>Filtreye uyan kitap yok.</p>
      ) : (
        <div className="row">
          {filtrelenmisKitaplar.map((kitap) => (
            <div className="col-md-4 mb-4" key={kitap.id}>
              <KitapCard kitap={kitap} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
