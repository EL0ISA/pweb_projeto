'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Função para buscar os dados do arcano
async function fetchArcano(numero) {
  const response = await fetch(`http://localhost:3000/api/arcanos/${numero}`);
  if (!response.ok) {
    throw new Error('Erro ao carregar o arcano');
  }
  return response.json();
}

// Função para somar os dígitos de um número
const somarDigitos = (numero) => {
  return numero
    .toString()
    .split('')
    .reduce((acc, curr) => acc + parseInt(curr), 0);
};

export default function Arcano() {
  const router = useRouter(); // Hook para navegação
  const [diaNascimento, setDiaNascimento] = useState('');
  const [mesNascimento, setMesNascimento] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');
  const [anoConsulta, setAnoConsulta] = useState('');
  const [arcanoPessoal, setArcanoPessoal] = useState(null);
  const [arcanoAnual, setArcanoAnual] = useState(null);
  const [arcanoDetailsPessoal, setArcanoDetailsPessoal] = useState(null);
  const [arcanoDetailsAnual, setArcanoDetailsAnual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDiaChange = (e) => setDiaNascimento(e.target.value);
  const handleMesChange = (e) => setMesNascimento(e.target.value);
  const handleAnoNascimentoChange = (e) => setAnoNascimento(e.target.value);
  const handleAnoConsultaChange = (e) => setAnoConsulta(e.target.value);

  const calcularArcanoPessoal = async () => {
    if (!diaNascimento || !mesNascimento || !anoNascimento) {
      setError('Por favor, preencha todos os campos para o Arcano Pessoal.');
      return;
    }

    const somaNascimento = parseInt(diaNascimento) + parseInt(mesNascimento) + parseInt(anoNascimento);
    let arcano = somaNascimento;

    while (arcano > 22) {
      arcano = somarDigitos(arcano);
    }

    setArcanoPessoal(arcano);

    try {
      const arcanoInfo = await fetchArcano(arcano);
      setArcanoDetailsPessoal(arcanoInfo);
    } catch (err) {
      console.error('Erro ao carregar os detalhes do arcano:', err);
      setError('Erro ao carregar detalhes do arcano');
    }
  };

  const calcularArcanoAnual = async () => {
    if (!anoConsulta || !diaNascimento || !mesNascimento || !anoNascimento) {
      setError('Por favor, preencha todos os campos necessários e calcule o Arcano Pessoal primeiro.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const somaNascimento = parseInt(diaNascimento) + parseInt(mesNascimento) + parseInt(anoNascimento);
      const somaAnoConsulta = parseInt(anoConsulta);
      const somaTotal = somaNascimento + somaAnoConsulta;

      let arcanoAnual = somaTotal;

      while (arcanoAnual > 22) {
        arcanoAnual = somarDigitos(arcanoAnual);
      }

      setArcanoAnual(arcanoAnual);

      const arcanoInfo = await fetchArcano(arcanoAnual);
      setArcanoDetailsAnual(arcanoInfo);
    } catch (err) {
      console.error('Erro ao calcular ou buscar Arcano Anual:', err);
      setError('Erro ao calcular ou buscar Arcano Anual');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Calculadora de Arcanos Pessoal e Anual</h1>

      {/* Arcano Pessoal */}
      <div>
        <h2>Calcule seu Arcano Pessoal</h2>
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

        <label htmlFor="anoNascimento">Ano de Nascimento:</label>
        <input
          type="number"
          id="anoNascimento"
          value={anoNascimento}
          onChange={handleAnoNascimentoChange}
          required
          min="1900"
          max="2100"
        />

        <button onClick={calcularArcanoPessoal}>Calcular Arcano Pessoal</button>

        {arcanoPessoal && (
          <div>
            <p>Arcano Pessoal: {arcanoPessoal}</p>
            {arcanoDetailsPessoal && (
              <div>
                <h3>{arcanoDetailsPessoal.nome}</h3>
                <p>{arcanoDetailsPessoal.descricao}</p>
                <button onClick={() => router.push(`/arcanos/${arcanoPessoal}`)}>Mais Detalhes</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Arcano Anual */}
      <div>
        <h2>Calcule seu Arcano Anual</h2>
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

        <button
          onClick={calcularArcanoAnual}
          disabled={!arcanoPessoal || loading} // Botão desabilitado até que o Arcano Pessoal seja calculado
        >
          {loading ? 'Calculando...' : 'Calcular Arcano Anual'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {arcanoAnual && (
          <div>
            <p>Arcano Anual: {arcanoAnual}</p>
            {arcanoDetailsAnual && (
              <div>
                <h3>{arcanoDetailsAnual.nome}</h3>
                <p>{arcanoDetailsAnual.descricao}</p>
                <button onClick={() => router.push(`/arcanos/${arcanoAnual}`)}>Mais Detalhes</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
