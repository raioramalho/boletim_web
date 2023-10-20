import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons"; // Exemplo de ícone PDF, você pode escolher outros ícones
import Card from "./card";

export default function Lista({ dados }: { dados: any[] }) {
  return (
    <div className="text-white rounded-lg">
      <ul className="list-disc pl-4">
        {dados.map((link, index) => (
          <li key={index} className="mb-2">
            <Link
              href={`http://sisbol.ect.eb.mil.br/band/${link}`}
              className="text-blue-500 hover:underline flex items-center"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faFilePdf} />
              </span>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
