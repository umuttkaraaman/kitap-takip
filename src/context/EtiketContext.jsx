import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const EtiketContext = createContext();

export function EtiketProvider({ children }) {
  const [etiketDurumu, setEtiketDurumu] = useState({});

  // 🔑 Token’ı localStorage’dan al
  const token = localStorage.getItem("token");

  // ✅ Etiketleri backend’den çek
  useEffect(() => {
    const fetchEtiketler = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/etiketler/kullanici-etiketleri", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const gelen = res.data; // örn: [{kitap_id: 1, etiket: "okundu"}, ...]
        const obj = {};
        gelen.forEach((item) => {
          obj[item.kitap_id] = item.etiket;
        });
        setEtiketDurumu(obj);
      } catch (err) {
        console.error("Etiketler alınamadı:", err);
      }
    };

    fetchEtiketler();
  }, [token]);

  const etiketiGuncelle = (kitapId, yeniEtiket) => {
    setEtiketDurumu((prev) => ({
      ...prev,
      [kitapId]: yeniEtiket,
    }));
  };

  return (
    <EtiketContext.Provider value={{ etiketDurumu, etiketiGuncelle }}>
      {children}
    </EtiketContext.Provider>
  );
}

export function useEtiket() {
  return useContext(EtiketContext);
}
