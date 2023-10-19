"use client"
import { useState, useEffect } from "react";
import Lista from "./componentes/lista";
import Loading from "./loading";

export default function Home() {
  const [ano, setAno] = useState("2023");
  const [mes, setMes] = useState("01"); // Inicialize com "01" (Janeiro)
  const [links, setLinks] = useState<string[] | null>([]);

  // Mapeamento de nomes de mês para números
  const mesNumeroMap = {
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

    console.log("ENTRANDO NO USEEFFECT!")

    async function fetchAndParseData() {
      const url = `http://sisbol.ect.eb.mil.br/band/baixar_boletim.php?codTipoBol=1&ano=${ano}&mes=${mes}`;

      try {
        const response = await fetch(url);

        if (response.status != 200) {
          throw new Error(
            `Falha na solicitação HTTP: ${response.status} - ${response.statusText}`
          );
        }

        const text: any = await response.text();

        setLinks(text);
      } catch (error) {
        console.error(`Erro: ${error}`);
        setLinks([]);
      }
    }

    fetchAndParseData();
  }, [ano, mes]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex">
        <h1 className="text-2xl mb-4">BOLETIM INTERNO</h1>
        <div className="mb-4">
          <label htmlFor="anoSelect">Ano : </label>
          <select
            id="anoSelect"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="dark:bg-gray-800 dark:text-white rounded-md p-2"
          >
            <option value="2023">2023</option>
            {/* Adicione outras opções de anos aqui, se necessário */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="mesSelect">Mês : </label>
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

        <div className="border border-gray-800 p-2">
          <Lista dados={links} /
        </div>
      </div>
    </main>
  );
}
