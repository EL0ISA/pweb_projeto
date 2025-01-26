'use client';

import { useState } from 'react';

// Função para buscar os dados do arcano
async function fetchArcano(numero) {
  const response = await fetch(`http://localhost:3000/api/arcanos/${numero}`); // URL corrigida para a API
  if (!response.ok) {
    throw new Error('Erro ao carregar o arcano');
  }
  return response.json();
}

export default function ArcanoAnual() {
  const [diaNascimento, setDiaNascimento] = useState('');
  const [mesNascimento, setMesNascimento] = useState('');
  const [anoConsulta, setAnoConsulta] = useState('');
  const [arcanoAnual, setArcanoAnual] = useState(null);
  const [arcanoDetails, setArcanoDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDiaChange = (e) => setDiaNascimento(e.target.value);
  const handleMesChange = (e) => setMesNascimento(e.target.value);
  const handleAnoChange = (e) => setAnoConsulta(e.target.value);

  // Função para somar os dígitos de um número
  const somarDigitos = (numero) => {
    return numero
      .toString()
      .split('')
      .reduce((acc, curr) => acc + parseInt(curr), 0);
  };

  const calcularArcanoAnual = async () => {
    setLoading(true);
    setError('');
    setArcanoDetails(null);

    try {
      if (!diaNascimento || !mesNascimento || !anoConsulta) {
        setError('Por favor, preencha todos os campos.');
        setLoading(false);
        return;
      }

      // Somar os dígitos do dia, mês e ano de consulta
      const somaDia = somarDigitos(parseInt(diaNascimento));
      const somaMes = somarDigitos(parseInt(mesNascimento));
      const somaAno = somarDigitos(parseInt(anoConsulta));

      let arcano = somaDia + somaMes + somaAno;

      // Reduz a soma até que o arcano esteja entre 1 e 22
      while (arcano > 22) {
        arcano = somarDigitos(arcano);
      }

      setArcanoAnual(arcano);

      // Buscar detalhes do arcano
      const arcanoInfo = await fetchArcano(arcano);
      setArcanoDetails(arcanoInfo);
    } catch (err) {
      console.error('Erro ao calcular ou buscar arcano:', err);
      setError('Erro ao calcular ou buscar arcano');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Calcular Arcano Anual</h1>

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
        onChange={handleAnoChange}
        required
        min="1900"
        max="2100"
      />

      <button onClick={calcularArcanoAnual} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular Arcano Anual'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {arcanoAnual && (
        <div>
          <h2>Arcano Anual: {arcanoAnual}</h2>
          {arcanoDetails ? (
            <div>
              <h3>{arcanoDetails.nome}</h3>
              <p>{arcanoDetails.descricao}</p>
              <p><strong>Cor:</strong> {arcanoDetails.cor}</p>
            </div>
          ) : (
            <p>Carregando detalhes do arcano...</p>
          )}
        </div>
      )}
    </div>
  );
}
