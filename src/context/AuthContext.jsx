import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [kullanici, setKullanici] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const kullaniciAdi = localStorage.getItem("kullanici");
    const rol = localStorage.getItem("rol");

    if (token && kullaniciAdi && rol) {
      setKullanici({ kullaniciAdi, rol });
    }
  }, []);

  const girisYap = (kullaniciAdi, token, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("kullanici", kullaniciAdi);
    localStorage.setItem("rol", rol);
    setKullanici({ kullaniciAdi, rol });
    navigate("/kitaplar");
  };

  const cikisYap = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("kullanici");
    localStorage.removeItem("rol");
    setKullanici(null);
    navigate("/giris");
  };

  return (
    <AuthContext.Provider value={{ kullanici, girisYap, cikisYap }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
