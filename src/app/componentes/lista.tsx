// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf } from "@fortawesome/free-regular-svg-icons"; // Exemplo de ícone PDF, você pode escolher outros ícones

// export default function Lista({ dados }: { dados: any[] }) {
//   return (
//     <div className="text-white rounded-lg">
//       <ul className="list-disc pl-4">
//         {dados.map((link, index) => (
//           <li key={index} className="mb-2">
//             <Link
//               href={`http://sisbol.ect.eb.mil.br/band/${link}`}
//               className="text-blue-500 hover:underline flex items-center"
//             >
//               <span className="mr-2">
//                 <FontAwesomeIcon icon={faFilePdf} />
//               </span>
//               {link}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "react-modal"; // Certifique-se de instalar esta dependência

export default function Lista({ dados }: { dados: string[] }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");

  const openModal = (link: string) => {
    setCurrentLink(link);
    console.log(currentLink);
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
      >
        <br></br>
        <button onClick={closeModal}>Fechar</button>
        {currentLink && (
          <iframe
            src={`http://sisbol.ect.eb.mil.br/band/${currentLink}`}
            width="100%"
            height="500"
            title="Link Modal"
          />
        )}
      </Modal>
    </div>
  );
}
