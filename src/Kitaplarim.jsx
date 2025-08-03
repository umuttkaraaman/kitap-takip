import React from "react";
import kitaplar from "../veri/katalog";
import { useEtiket } from "../context/EtiketContext";

export default function Kitaplarim() {
  const { etiketlerMap } = useEtiket();

  const kullaniciKitaplari = kitaplar.filter(k =>
    etiketlerMap[k.id] && etiketlerMap[k.id].length > 0
  );

  return (
    <div>
      <h3 className="mb-4">Kitaplarım</h3>

      {kullaniciKitaplari.length === 0 ? (
        <div className="text-muted">Henüz hiç kitap etiketlenmemiş.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {kullaniciKitaplari.map(kitap => (
            <div className="col" key={kitap.id}>
              <div className="card h-100">
                <img
                  src={kitap.kapak}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt={kitap.baslik}
                />
                <div className="card-body">
                  <h5 className="card-title">{kitap.baslik}</h5>
                  <p className="text-muted">{kitap.yazar}</p>
                  <div className="small">
                    Etiketler:{" "}
                    {etiketlerMap[kitap.id].join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
