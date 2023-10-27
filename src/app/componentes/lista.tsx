import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-modal";

export default function Lista({ dados }: { dados: string[] }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");

  const openModal = (link: string) => {
    setCurrentLink(link);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentLink("");
    setModalIsOpen(false);
  };

  return (
    <div className="text-white rounded-lg">
      <ul className="list-disc pl-4">
        {dados.map((link, index) => (
          <li key={index} className="mb-2">
            <button
              onClick={() => openModal(link)}
              className="text-blue-500 hover:underline flex items-center"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faFilePdf} />
              </span>
              {link}
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        shouldCloseOnEsc={true}
      >
        <div className="text-gray-900 p-4">
          <button
            onClick={closeModal}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full"
          >
            Fechar
          </button>
          {currentLink && (
            <iframe
              src={`http://sisbol.ect.eb.mil.br/band/${currentLink}`}
              width="100%"
              height="700"
              title={`${currentLink.toUpperCase()}`}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
