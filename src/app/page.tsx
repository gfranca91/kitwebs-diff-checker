"use client";

import { useState } from "react";
import { diffLines, type Change } from "diff";

export default function Home() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffResult, setDiffResult] = useState<Change[] | null>(null);

  const handleCompare = () => {
    const differences = diffLines(textA, textB);
    setDiffResult(differences);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Diff Checker</h1>
        <p className="text-center text-gray-400 mt-2">
          Compare dois textos e veja as diferenças
        </p>
      </header>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{ minHeight: "40vh" }}
      >
        <div>
          <label
            htmlFor="textA"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Texto Original
          </label>
          <textarea
            id="textA"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            className="w-full h-full p-4 bg-gray-800 border border-gray-600 rounded-md resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cole o primeiro texto aqui..."
          />
        </div>
        <div>
          <label
            htmlFor="textB"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Texto Modificado
          </label>
          <textarea
            id="textB"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            className="w-full h-full p-4 bg-gray-800 border border-gray-600 rounded-md resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cole o segundo texto aqui..."
          />
        </div>
      </div>

      <div className="my-6 text-center">
        <button
          onClick={handleCompare}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors disabled:bg-gray-500"
          disabled={!textA && !textB}
        >
          Comparar Textos
        </button>
      </div>

      {diffResult && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Resultado da Comparação:
          </h2>
          <pre className="p-4 bg-gray-800 rounded-md text-sm font-mono whitespace-pre-wrap overflow-auto">
            {diffResult.map((change, index) => {
              const colorClass = change.added
                ? "bg-green-900 bg-opacity-50"
                : change.removed
                ? "bg-red-900 bg-opacity-50"
                : "opacity-80";
              const prefix = change.added ? "+" : change.removed ? "-" : " ";

              return (
                <div key={index} className={colorClass}>
                  <span className="select-none w-8 inline-block text-gray-500 text-right pr-2">
                    {prefix}
                  </span>
                  <span className="break-all">
                    {change.value.replace(/\n$/, "")}
                  </span>
                </div>
              );
            })}
          </pre>
        </div>
      )}

      <section className="container mx-auto mt-12 text-gray-400 prose prose-invert prose-lg max-w-none">
        <h2>O que é um Diff Checker?</h2>
        <p>
          Um comparador de diferenças (Diff Checker) é uma ferramenta que
          analisa dois conjuntos de texto e destaca as mudanças entre eles. É
          uma funcionalidade essencial para programadores, escritores e qualquer
          pessoa que precise rastrear alterações entre duas versões de um mesmo
          documento.
        </p>

        <h2>Como Usar Esta Ferramenta?</h2>
        <ol>
          <li>
            <strong>Cole o Texto Original:</strong> Na caixa da esquerda, cole a
            primeira versão do seu texto ou código.
          </li>
          <li>
            <strong>Cole o Texto Modificado:</strong> Na caixa da direita, cole
            a versão atualizada do texto.
          </li>
          <li>
            <strong>Compare:</strong> Clique no botão para iniciar a comparação.
          </li>
          <li>
            <strong>Analise o Resultado:</strong> A ferramenta exibirá uma
            visualização unificada, onde linhas removidas são destacadas em
            vermelho (-), linhas adicionadas em verde (+), e as inalteradas
            permanecem com o fundo padrão.
          </li>
        </ol>
        <p>
          Esta ferramenta roda 100% no seu navegador, garantindo que seus dados
          permaneçam privados e seguros. Nenhuma informação é enviada para
          nossos servidores.
        </p>
      </section>
    </main>
  );
}
