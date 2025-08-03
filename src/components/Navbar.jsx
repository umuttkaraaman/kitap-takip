import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { kullanici, cikisYap } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        📚 Kitap Takip
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {kullanici && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/kitaplar">
                  Kitaplar
                </Link>
              </li>
              {kullanici.rol === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/ekle">
                    Kitap Ekle
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/benim">
                  Benim Kitaplarım
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav">
          {!kullanici ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/giris">
                  Giriş
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kayit">
                  Kayıt Ol
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={cikisYap}>
                Çıkış Yap
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
