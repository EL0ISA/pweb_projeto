import React from "react";

// Função para buscar os dados do ano pessoal
async function fetchAnoPessoal(ano) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ano_pessoal/${ano}`
  );
  if (!response.ok) {
    throw new Error("Erro ao carregar os dados do ano pessoal");
  }
  return response.json();
}

export default async function AnoPessoalPage({ params }) {
  const { ano } = params; // Obtém o ano da URL

  // Busca os dados do ano pessoal da API
  let anoPessoal;
  try {
    anoPessoal = await fetchAnoPessoal(ano); // Requisição para a API
  } catch (error) {
    console.error("Erro ao buscar ano pessoal:", error);
    return <div>Erro ao carregar os dados do ano pessoal</div>;
  }

  // Divide o campo "cor" em um array caso contenha múltiplas cores separadas por vírgula
  const cores = anoPessoal.cor.split(",");

  // Exibição dos dados do ano pessoal
  return (
    <div className="d-flex justify-content-center align-items-center bg-black min-vh-100">
      <div className="container text-white">
        <div
          className="card bg-light text-dark p-4 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Título do Ano Pessoal */}
          <h1 className="card-title text-center">{anoPessoal.nome}</h1>

          {/* Descrição */}
          <p className="card-text mt-3 fs-5">{anoPessoal.descricao}</p>

          {/* Exibição das cores */}
          <div className="mt-4">
            <h5>Cor(es):</h5>
            <div className="d-flex flex-wrap gap-3 mt-2">
              {cores.map((cor, index) => (
                <div
                  key={index}
                  className="rounded"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: cor.trim(), // Remove espaços em branco
                    border: "1px solid #000",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Função para gerar os parâmetros estáticos
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ano_pessoal`
  );
  const anosPessoais = await response.json();

  // Retorna os anos de todos os anos pessoais para gerar as páginas
  return anosPessoais.map((anoPessoal) => ({
    ano: anoPessoal.ano.toString(),
  }));
}
