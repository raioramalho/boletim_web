import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

export default function Card(props: any) {

  const lista = [
    "boletim/2023-10-19_O_194_boletim_interno_.pdf",
    "boletim/2023-10-18_O_193_boletim_interno_.pdf",
  ];

  const dados: any = lista.map((string) => {
    const partes = string.split("_");
    const anoMesNumero = partes[0].split("/")[1];

    const ano = anoMesNumero.slice(0, 4);
    const mes = anoMesNumero.slice(5, 7);
    const numero = partes[2];

    return {
      ano,
      mes,
      numero,
      link: string,
    };
  });

  const data = dados[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <span className="text-blue-500 mr-2">
          <FontAwesomeIcon icon={faFilePdf} />
        </span>
        <Link
          href={`http://sisbol.ect.eb.mil.br/band/${data.link}`}
          className="text-blue-500 hover:underline"
        >
          {data.link}
        </Link>
      </div>
      <div className="text-gray-700">Ano: {data.ano}</div>
      <div className="text-gray-700">Mês: {data.mes}</div>
      <div className="text-gray-700">Número: {data.numero}</div>
    </div>
  );
}
