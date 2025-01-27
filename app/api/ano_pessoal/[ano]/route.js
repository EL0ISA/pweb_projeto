import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  // Await para garantir que o parâmetro 'ano' seja acessado corretamente
  const { ano } = await params;  // Obtém o parâmetro 'ano' da URL

  try {
    // Busca o ano pessoal usando o campo 'ano' com o 'where'
    const anoPessoal = await prisma.anoPessoal.findUnique({
      where: {
        ano: parseInt(ano, 10), // Certifique-se de que 'ano' é convertido para inteiro
      },
    });

    if (!anoPessoal) {
      return new Response(JSON.stringify({ error: 'Ano pessoal não encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify(anoPessoal), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar ano pessoal:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar ano pessoal' }), { status: 500 });
  }
}

