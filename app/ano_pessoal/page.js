import { notFound } from 'next/navigation';

// Função para buscar todos os anos pessoais
async function fetchAllAnosPessoais() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ano_pessoal`);

  if (!res.ok) {
    throw new Error('Erro ao carregar os anos pessoais');
  }

  const anosPessoais = await res.json();
  return anosPessoais;
}

export default async function AnoPessoalPage() {
  const anosPessoais = await fetchAllAnosPessoais();

  if (!anosPessoais || anosPessoais.length === 0) {
    notFound(); // Exibe uma página 404 se não houver anos pessoais
  }

  return (
    <div>
      <h1>Todos os Anos Pessoais</h1>
      {anosPessoais.map((anoPessoal) => (
        <div key={anoPessoal.ano}>
          <h2>Ano: {anoPessoal.ano}</h2>
          <p>Cor: {anoPessoal.cor}</p>
          <p>Descrição: {anoPessoal.descricao}</p>
        </div>
      ))}
    </div>
  );
}
