import React from 'react';

// Função para buscar os dados do arcano
async function fetchArcano(numero) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/arcanos/${numero}`); // URL da API para o arcano específico
  if (!response.ok) {
    throw new Error('Erro ao carregar o arcano');
  }
  
  // Verificação se a resposta é JSON
  const contentType = response.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('A resposta não é em formato JSON');
  }

  return response.json();
}

export default async function ArcanoPage({ params }) {
  const { numero } = params;  // Obtém o número do arcano da URL

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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/arcanos`);
    if (!response.ok) {
      throw new Error('Erro ao carregar os arcanos');
    }

    const arcanos = await response.json();
    console.log('Arcanos:', arcanos); // Verificação da resposta da API

    // Retorna os números de todos os arcanos para gerar as páginas
    return arcanos.map((arcano) => ({
      numero: arcano.numero.toString(),
    }));
  } catch (error) {
    console.error('Erro ao buscar arcanos:', error);
    return []; // Retorna uma lista vazia caso haja erro
  }
}
