"use client";
import { useState, useEffect } from "react";
import Lista from "./componentes/lista";
import Loading from "./loading";
import Card from "./componentes/card";
import { link } from "fs";
import axios from "axios";
import { Boletim } from "./boletim";

export default function Home() {
  const [ano, setAno] = useState("2023");
  const [mes, setMes] = useState("01"); // Inicialize com "01" (Janeiro)

  const [links, setLinks] = useState<any[]>([]);



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
    console.log("ENTRANDO NO USEEFFECT!");

    async function fetchAndParseData() {
      try {
        const dados = await axios
          .get(
            `http://sisbol.ect.eb.mil.br/band/baixar_boletim.php?codTipoBol=1&ano=${ano}&mes=${mes}`
          )
          .then(async (response) => {
            const html = response.data;
            const pdfLinks: any = html.match(
              /boletim\/\d+-\d+-\d+_O_\d+_boletim_interno_.pdf/g
            );

            if (!pdfLinks) {
              throw new Error("Nenhum link encontrado na página.");
            }


            let dados = [];

            for (let index = 0; index < pdfLinks.length; index++) {
              if (pdfLinks[index] != pdfLinks[index - 1]) {
                dados.push(pdfLinks[index]);
              }
            }

            setLinks(dados);
            return await dados;
          })
          .catch((error) => {
            console.error(error);
          });

        const objetos = dados.map((string) => {
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

        // console.log(objetos);
      } catch (error) {
        console.log(`Erro: ${error}`);
        setLinks([]);
      }
    }

    fetchAndParseData();
  }, [ano, mes]);


  return (
    <main className="flex flex-col items-center justify-between p-14 mb-2">
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
          <label htmlFor="mesSelect">Mês : </label>
          <select
            id="mesSelect"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="dark:bg-gray-800 dark:text-white rounded-md p-2"
          >
            {Object.keys(mesNumeroMap).map((nomeMes: any) => (
              <option key={nomeMes} value={mesNumeroMap[nomeMes]}>
                {nomeMes}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="border border-gray-800 p-2 rounded-lg">
        {links.length > 0 ? <Lista dados={links}></Lista> : <Loading />}
      </div>
    </main>
  );
}
