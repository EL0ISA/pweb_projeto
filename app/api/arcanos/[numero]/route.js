import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  const { numero } = params;  // Obtém o parâmetro da URL (número)

  try {
    const arcano = await prisma.arcano.findUnique({
      where: { numero: parseInt(numero, 10) },  // Busca o arcano pelo número
    });

    if (!arcano) {
      return new Response(JSON.stringify({ error: 'Arcano não encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify(arcano), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar arcano:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar arcano' }), { status: 500 });
  }
}