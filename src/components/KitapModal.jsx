import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function KitapModal({ show, handleClose, kitap, etiket, setEtiket, handleEtiketKaydet }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{kitap?.baslik}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Yazar:</strong> {kitap?.yazar}</p>
        <p><strong>Açıklama:</strong> {kitap?.aciklama}</p>

        <hr />
        <label htmlFor="etiket">Etiket seç:</label>
        <select
          id="etiket"
          className="form-select mt-2"
          value={etiket}
          onChange={(e) => setEtiket(e.target.value)}
        >
          <option value="">Etiket Seç</option>
          <option value="okundu">Okundu</option>
          <option value="okunacak">Okunacak</option>
          <option value="favori">Favori</option>
          <option value="rafa_kaldirildi">Rafa Kaldırıldı</option>
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={handleEtiketKaydet}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
