import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

interface PdfModalProps {
  isOpen: boolean;
  closeModal: () => void;
  pdfUrl: string;
}

export default function PdfModal({ isOpen, closeModal, pdfUrl }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="PDF Modal">
      <button onClick={closeModal}>Fechar</button>
      <iframe src={pdfUrl} width="100%" height="100%" title="PDF Document" />
    </Modal>
  );
};
