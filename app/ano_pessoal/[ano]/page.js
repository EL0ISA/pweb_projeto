import React from 'react';

// Função para buscar os dados do ano pessoal
async function fetchAnoPessoal(ano) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ano_pessoal/${ano}`); // Corrigido para a URL correta
  if (!response.ok) {
    throw new Error('Erro ao carregar os dados do ano pessoal');
  }
  return response.json();
}

export default async function AnoPessoalPage({ params }) {
  const { ano } = params;  // Obtém o ano da URL

  // Busca os dados do ano pessoal da API
  let anoPessoal;
  try {
    anoPessoal = await fetchAnoPessoal(ano); // Requisição para a API
  } catch (error) {
    console.error('Erro ao buscar ano pessoal:', error);
    return <div>Erro ao carregar os dados do ano pessoal</div>;
  }

  // Exibição dos dados do ano pessoal
  return (
    <div>
      <h1>Ano Pessoal {anoPessoal.ano}</h1>
      <p>{anoPessoal.descricao}</p>
      <p>Cor: {anoPessoal.cor}</p>
    </div>
  );
}

// Função para gerar os parâmetros estáticos
export async function generateStaticParams() {
  // Aqui você pode buscar todos os anos para gerar as páginas
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ano_pessoal`);
  const anosPessoais = await response.json();

  // Retorna os anos de todos os anos pessoais para gerar as páginas
  return anosPessoais.map((anoPessoal) => ({
    ano: anoPessoal.ano.toString(),
  }));
}

