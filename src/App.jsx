import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Giris from "./pages/Giris";
import Kayit from "./pages/Kayit";
import Kitaplar from "./pages/Kitaplar";
import KitapEkle from "./pages/KitapEkle";
import BenimKitaplar from "./pages/BenimKitaplar";
import PrivateRoute from "./components/PrivateRoute";
import KitapDuzenle from "./pages/KitapDuzenle";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/kayit" element={<Kayit />} />
        <Route path="/kitaplar" element={<Kitaplar />} />
        <Route path="/kitap-duzenle/:kitapId" element={<KitapDuzenle />} />
        <Route
          path="/ekle"
          element={
            <PrivateRoute>
              <KitapEkle />
            </PrivateRoute>
          }
        />
        <Route
          path="/benim"
          element={
            <PrivateRoute>
              <BenimKitaplar />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
