import { notFound } from 'next/navigation';

// Função para buscar todos os arcanos
async function fetchAllArcanos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/arcanos`);

  if (!res.ok) {
    throw new Error('Erro ao carregar os arcanos');
  }

  const arcanos = await res.json();
  return arcanos;
}

export default async function ArcanosPage() {
  const arcanos = await fetchAllArcanos();

  if (!arcanos || arcanos.length === 0) {
    notFound(); // Exibe uma página 404 se não houver arcanos
  }

  return (
    <div>
      <h1>Todos os Arcanos</h1>
      {arcanos.map((arcano) => (
        <div key={arcano.numero}>
          <h2>{arcano.nome}</h2>
          <p>{arcano.descricao}</p>
        </div>
      ))}
    </div>
  );
}

