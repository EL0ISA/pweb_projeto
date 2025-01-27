import React from 'react';

// Função para buscar os dados do arcano
async function fetchArcano(numero) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/arcanos/${numero}`); // Corrigido para a URL correta
  if (!response.ok) {
    throw new Error('Erro ao carregar o arcano');
  }
  return response.json();
}

export default async function ArcanoPage({ params }) {
  const { numero } = await params;  // Obtém o número do arcano da URL

  // Busca os dados do arcano da API
  let arcano;
  try {
    arcano = await fetchArcano(numero); // Requisição para a API
  } catch (error) {
    console.error('Erro ao buscar arcano:', error);
    return <div>Erro ao carregar o arcano</div>;
  }

  // Exibição do arcano
  return (
    <div>
      <h1>{arcano.nome}</h1>
      <p>{arcano.descricao}</p>
      {arcano.imagem_url && (
        <img
          src={arcano.imagem_url}
          alt={`Imagem do arcano ${arcano.nome}`}
          style={{ width: '300px', height: 'auto', borderRadius: '8px', marginTop: '16px' }}
        />
      )}
    </div>
  );
}

// Função para gerar os parâmetros estáticos
export async function generateStaticParams() {
  // Aqui você pode buscar os números dos arcanos que deseja gerar as páginas
  // Exemplo: Buscar todos os números dos arcanos
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/arcanos`);
  const arcanos = await response.json();

  // Retorna os números de todos os arcanos para gerar as páginas
  return arcanos.map((arcano) => ({
    numero: arcano.numero.toString(),
  }));
}


