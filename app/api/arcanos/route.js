import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Busca todos os arcanos
    const arcanos = await prisma.arcano.findMany();

    if (!arcanos || arcanos.length === 0) {
      return new Response(JSON.stringify({ error: 'Nenhum arcano encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify(arcanos), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar arcanos:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar arcanos' }), { status: 500 });
  }
}
