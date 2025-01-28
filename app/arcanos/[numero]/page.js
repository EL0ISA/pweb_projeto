import React from "react";

// Função para buscar os dados do arcano
async function fetchArcano(numero) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/arcanos/${numero}`
  ); // Corrigido para a URL correta
  if (!response.ok) {
    throw new Error("Erro ao carregar o arcano");
  }
  return response.json();
}

export default async function ArcanoPage({ params }) {
  const { numero } = await params; // Obtém o número do arcano da URL

  // Busca os dados do arcano da API
  let arcano;
  try {
    arcano = await fetchArcano(numero); // Requisição para a API
  } catch (error) {
    console.error("Erro ao buscar arcano:", error);
    return <div>Erro ao carregar o arcano</div>;
  }

  // Exibição do arcano
  return (
    <div className="d-flex justify-content-center align-items-center bg-black min-vh-100">
      <div className="card p-4" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          <h1 className="card-title text-dark mb-3">{arcano.nome}</h1>
          <p className="card-text text-muted mb-3 fs-5">{arcano.descricao}</p>
          {arcano.imagem_url && (
            <img
              src={arcano.imagem_url}
              alt={`Imagem do arcano ${arcano.nome}`}
              className="img-fluid rounded mb-3"
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Função para gerar os parâmetros estáticos
export async function generateStaticParams() {
  // Aqui você pode buscar os números dos arcanos que deseja gerar as páginas
  // Exemplo: Buscar todos os números dos arcanos
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/arcanos`
  );
  const arcanos = await response.json();

  // Retorna os números de todos os arcanos para gerar as páginas
  return arcanos.map((arcano) => ({
    numero: arcano.numero.toString(),
  }));
}
