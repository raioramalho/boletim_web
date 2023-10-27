"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Lista from "./componentes/lista";
import Loading from "./loading";

export default function Home() {
  // Estados
  const [ano, setAno] = useState(dayjs().year().toString());
  const [mes, setMes] = useState((dayjs().month() + 1).toString()); // Inicialize com "01" (Janeiro)
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Mapeamento de nomes de mês para números
  const mesNumeroMap: Record<string, string> = {
    Janeiro: "01",
    Fevereiro: "02",
    Março: "03",
    Abril: "04",
    Maio: "05",
    Junho: "06",
    Julho: "07",
    Agosto: "08",
    Setembro: "09",
    Outubro: "10",
    Novembro: "11",
    Dezembro: "12",
  };

  useEffect(() => {
    async function fetchAndParseData() {
      try {
        setLoading(true); // Ativar indicador de carregamento

        const response = await axios.get(
          `http://sisbol.ect.eb.mil.br/band/baixar_boletim.php?codTipoBol=1&ano=${ano}&mes=${mes}`
        );

        const html = response.data;
        const pdfLinks: RegExpMatchArray | null = html.match(
          /boletim\/\d+-\d+-\d+_O_\d+_boletim_interno_.pdf/g
        );

        if (!pdfLinks) {
          throw new Error("Nenhum link encontrado na página.");
        }

        const uniqueLinks = pdfLinks.filter(
          (link, index) => pdfLinks.indexOf(link) === index
        );

        setLinks(uniqueLinks);
      } catch (error) {
        console.error(`Erro: ${error}`);
        setLinks([]);
      } finally {
        setLoading(false); // Desativar indicador de carregamento
      }
    }

    fetchAndParseData();
  }, [ano, mes]);

  return (
    <main className="flex flex-col items-center justify-between p-14 mb-2">
        <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex">
          <h1 className="text-2xl mb-4">BOLETIM INTERNO</h1>
          <div className="mb-4">
            <label htmlFor="anoSelect">Ano: </label>
            <select
              id="anoSelect"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="dark:bg-gray-800 dark:text-white rounded-md p-2"
            >
              {Array.from({ length: 10 }, (_, index) => {
                const year = 2023 - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="mesSelect">Mês: </label>
            <select
              id="mesSelect"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              className="dark:bg-gray-800 dark:text-white rounded-md p-2"
            >
              {Object.keys(mesNumeroMap).map((nomeMes) => (
                <option key={nomeMes} value={mesNumeroMap[nomeMes]}>
                  {nomeMes}
                </option>
              ))}
            </select>
          </div>
        </div>
      <div className="flex flex-col flex-wrap border border-gray-500 rounded-lg w-full mt-4">
        {loading ? <Loading /> : <Lista dados={links} />}
      </div>
    </main>
  );
}
