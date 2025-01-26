export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ano = searchParams.get('ano'); // Obtém o ano pessoal solicitado
  
    try {
      if (ano) {
        // Busca o registro do AnoPessoal pelo ano
        const anoPessoal = await prisma.anoPessoal.findUnique({
          where: { ano: parseInt(ano, 10) },
        });
  
        if (!anoPessoal) {
          return new Response(
            JSON.stringify({ error: 'Ano Pessoal não encontrado' }),
            { status: 404 }
          );
        }
  
        return new Response(JSON.stringify(anoPessoal), { status: 200 });
      }
  
      // Caso não tenha parâmetro, retorna todos os anos pessoais
      const anosPessoais = await prisma.anoPessoal.findMany();
      return new Response(JSON.stringify(anosPessoais), { status: 200 });
    } catch (error) {
      console.error('Erro ao buscar Ano Pessoal:', error);
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar Ano Pessoal' }),
        { status: 500 }
      );
    }
  }
  