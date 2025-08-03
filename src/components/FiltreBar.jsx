import React from "react";

export default function FiltreBar({ seciliKategori, setSeciliKategori }) {
  const kategoriler = ["Tümü", "Okundu", "Okunacak", "Favori", "Rafa Kaldırılan"];

  return (
    <div className="mb-4">
      <select
        className="form-select"
        value={seciliKategori}
        onChange={(e) => setSeciliKategori(e.target.value)}
      >
        {kategoriler.map((kategori) => (
          <option key={kategori} value={kategori}>
            {kategori}
          </option>
        ))}
      </select>
    </div>
  );
}
