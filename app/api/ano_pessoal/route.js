import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Busca todos os registros de AnoPessoal
    const anosPessoais = await prisma.anoPessoal.findMany();

    // Verifica se existem registros
    if (!anosPessoais || anosPessoais.length === 0) {
      return new Response(JSON.stringify({ error: 'Nenhum ano pessoal encontrado' }), { status: 404 });
    }

    // Retorna todos os registros encontrados
    return new Response(JSON.stringify(anosPessoais), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar anos pessoais:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar anos pessoais' }), { status: 500 });
  }
}