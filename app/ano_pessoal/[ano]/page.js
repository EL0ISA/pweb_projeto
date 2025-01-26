import { notFound } from 'next/navigation';

// Função para buscar o Ano Pessoal na API
async function fetchAnoPessoal(ano) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ano-pessoal?ano=${ano}`);
  
  if (!res.ok) {
    return null; // Retorna `null` se a API não encontrar o registro
  }
  
  const anoPessoal = await res.json();
  return anoPessoal;
}

export default async function AnoPessoalPage({ params }) {
  const { ano } = params; // Acessando diretamente o `params`

  // Busca os dados do Ano Pessoal através da API
  const anoPessoal = await fetchAnoPessoal(ano);

  if (!anoPessoal) {
    notFound(); // Redireciona para a página 404 se o registro não for encontrado
  }

  return (
    <div>
      <h1>Ano Pessoal: {anoPessoal.ano}</h1>
      <p>Cor: <strong style={{ color: anoPessoal.cor }}>{anoPessoal.cor}</strong></p>
      <p>Descrição: {anoPessoal.descricao}</p>
    </div>
  );
}