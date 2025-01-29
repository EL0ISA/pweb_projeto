'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Função para somar os dígitos de um número
const somarDigitos = (numero) => {
  return numero
    .toString()
    .split('')
    .reduce((acc, curr) => acc + parseInt(curr), 0);
};

// Função para buscar os dados do ano pessoal no banco
async function fetchAnoPessoal(ano) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ano_pessoal/${ano}`);
  if (!response.ok) {
    throw new Error('Erro ao carregar o ano pessoal');
  }
  return response.json();
}

export default function AnoPessoal() {
  const router = useRouter(); // Hook para navegação
  const [diaNascimento, setDiaNascimento] = useState('');
  const [mesNascimento, setMesNascimento] = useState('');
  const [anoConsulta, setAnoConsulta] = useState('');
  const [anoPessoal, setAnoPessoal] = useState(null);
  const [anoPessoalDetails, setAnoPessoalDetails] = useState(null);
  const [error, setError] = useState('');

  const handleDiaChange = (e) => setDiaNascimento(e.target.value);
  const handleMesChange = (e) => setMesNascimento(e.target.value);
  const handleAnoConsultaChange = (e) => setAnoConsulta(e.target.value);

  const calcularAnoPessoal = async () => {
    if (!diaNascimento || !mesNascimento || !anoConsulta) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Passo 1: Some os dígitos do Dia de Nascimento
      const somaDia = somarDigitos(diaNascimento);

      // Passo 2: Some o Mês de Nascimento
      const somaMes = parseInt(mesNascimento);

      // Passo 3: Calcule o Ano Universal somando os dígitos do Ano de Consulta
      const somaAnoUniversal = somarDigitos(anoConsulta);

      // Passo 4: Some os Resultados Obtidos
      const somaTotal = somaDia + somaMes + somaAnoUniversal;

      // Passo 5: Reduza a Soma a um Número de 1 a 9
      let anoPessoalCalc = somaTotal;
      while (anoPessoalCalc > 9) {
        anoPessoalCalc = somarDigitos(anoPessoalCalc);
      }

      setAnoPessoal(anoPessoalCalc);

      // Buscar informações sobre o Ano Pessoal
      const anoPessoalInfo = await fetchAnoPessoal(anoPessoalCalc);
      setAnoPessoalDetails(anoPessoalInfo);
    } catch (err) {
      console.error('Erro ao calcular o Ano Pessoal:', err);
      setError('Erro ao calcular o Ano Pessoal');
    }
  };

  return (
    <div>
      <h1>Calculadora de Ano Pessoal</h1>

      {/* Dados de Nascimento */}
      <div>
        <h2>Calcule seu Ano Pessoal</h2>
        <label htmlFor="diaNascimento">Dia de Nascimento:</label>
        <input
          type="number"
          id="diaNascimento"
          value={diaNascimento}
          onChange={handleDiaChange}
          required
          min="1"
          max="31"
        />

        <label htmlFor="mesNascimento">Mês de Nascimento:</label>
        <input
          type="number"
          id="mesNascimento"
          value={mesNascimento}
          onChange={handleMesChange}
          required
          min="1"
          max="12"
        />

        <label htmlFor="anoConsulta">Ano de Consulta:</label>
        <input
          type="number"
          id="anoConsulta"
          value={anoConsulta}
          onChange={handleAnoConsultaChange}
          required
          min="1900"
          max="2100"
        />

        <button onClick={calcularAnoPessoal}>Calcular Ano Pessoal</button>

        {anoPessoal && (
          <div>
            <p>Ano Pessoal: {anoPessoal}</p>
            {anoPessoalDetails && (
              <div>
                <h3>{anoPessoalDetails.nome}</h3>
                <p>{anoPessoalDetails.descricao}</p>
                <button onClick={() => router.push(`/ano_pessoal/${anoPessoal}`)}>Mais Detalhes</button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
