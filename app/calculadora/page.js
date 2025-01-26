// app/calculadora/page.js
import { useState } from 'react'
import { calcularAnoPessoal, calcularArcanoDaVida } from './serverActions'

export default function Calculadora() {
  const [dataNascimento, setDataNascimento] = useState('')
  const [anoPessoal, setAnoPessoal] = useState(null)
  const [arcanoVida, setArcanoVida] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ano = await calcularAnoPessoal(dataNascimento)
    const arcano = await calcularArcanoDaVida(dataNascimento)
    setAnoPessoal(ano)
    setArcanoVida(arcano)
  }

  return (
    <div>
      <h1>Calculadora de Ano Pessoal e Arcano da Vida</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
        <button type="submit">Calcular</button>
      </form>

      {anoPessoal && (
        <div>
          <h2>Seu Ano Pessoal:</h2>
          <p>{anoPessoal.descricao}</p>
        </div>
      )}

      {arcanoVida && (
        <div>
          <h2>Seu Arcano da Vida:</h2>
          <p>{arcanoVida.nome}: {arcanoVida.descricao}</p>
        </div>
      )}
    </div>
  )
}
