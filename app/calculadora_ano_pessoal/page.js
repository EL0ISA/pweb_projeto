"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Função para somar os dígitos de um número
const somarDigitos = (numero) => {
  return numero
    .toString()
    .split("")
    .reduce((acc, curr) => acc + parseInt(curr), 0);
};

// Função para buscar os dados do ano pessoal no banco
async function fetchAnoPessoal(ano) {
  const response = await fetch(`http://localhost:3000/api/ano_pessoal/${ano}`);
  if (!response.ok) {
    throw new Error("Erro ao carregar o ano pessoal");
  }
  return response.json();
}

export default function AnoPessoal() {
  const router = useRouter(); // Hook para navegação
  const [diaNascimento, setDiaNascimento] = useState("");
  const [mesNascimento, setMesNascimento] = useState("");
  const [anoConsulta, setAnoConsulta] = useState("");
  const [anoPessoal, setAnoPessoal] = useState(null);
  const [anoPessoalDetails, setAnoPessoalDetails] = useState(null);
  const [error, setError] = useState("");

  const handleDiaChange = (e) => setDiaNascimento(e.target.value);
  const handleMesChange = (e) => setMesNascimento(e.target.value);
  const handleAnoConsultaChange = (e) => setAnoConsulta(e.target.value);

  const calcularAnoPessoal = async () => {
    if (!diaNascimento || !mesNascimento || !anoConsulta) {
      setError("Por favor, preencha todos os campos.");
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
      console.error("Erro ao calcular o Ano Pessoal:", err);
      setError("Erro ao calcular o Ano Pessoal");
    }
  };
  return (
    <section id="ano-pessoal" className="ano-pessoal bg-black">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-5">
              <h3>Calculadora de Ano Pessoal</h3>
              <p>Descubra seu Ano Pessoal e o que ele reserva para você.</p>
            </div>

            {/* Dados de Nascimento */}
            <div className="card p-4 mb-4 shadow-sm">
              <h2 className="text-center mb-5">Calcule seu Ano Pessoal</h2>
              <div className="form-group mb-3">
                <label htmlFor="diaNascimento" className="form-label">
                  Dia de Nascimento:
                </label>
                <input
                  type="number"
                  id="diaNascimento"
                  value={diaNascimento}
                  onChange={handleDiaChange}
                  required
                  min="1"
                  max="31"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="mesNascimento" className="form-label">
                  Mês de Nascimento:
                </label>
                <input
                  type="number"
                  id="mesNascimento"
                  value={mesNascimento}
                  onChange={handleMesChange}
                  required
                  min="1"
                  max="12"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="anoConsulta" className="form-label">
                  Ano de Consulta:
                </label>
                <input
                  type="number"
                  id="anoConsulta"
                  value={anoConsulta}
                  onChange={handleAnoConsultaChange}
                  required
                  min="1900"
                  max="2100"
                  className="form-control"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={calcularAnoPessoal}
                  className="btn btn-warning w-100 mt-3"
                >
                  Calcular Ano Pessoal
                </button>
              </div>

              {anoPessoal && (
                <div className="mt-4">
                  <p>
                    <strong>Ano Pessoal:</strong> {anoPessoal}
                  </p>
                  {anoPessoalDetails && (
                    <div>
                      <h3>{anoPessoalDetails.nome}</h3>
                      <p>{anoPessoalDetails.descricao}</p>
                      <button
                        className="btn btn-warning w-50 mt-2"
                        onClick={() =>
                          router.push(`/ano_pessoal/${anoPessoal}`)
                        }
                      >
                        Mais Detalhes
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {error && <p className="text-danger text-center">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
