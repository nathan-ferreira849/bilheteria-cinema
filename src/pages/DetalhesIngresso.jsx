import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaSave, FaArrowLeft } from 'react-icons/fa'

function DetalhesIngresso({ ingressos, atualizarIngresso }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const ingressoAtual = ingressos.find((item) => item.id === Number(id))

  const [cliente, setCliente] = useState(ingressoAtual ? ingressoAtual.cliente : '')
  const [filme, setFilme] = useState(ingressoAtual ? ingressoAtual.filme : '')
  const [sala, setSala] = useState(ingressoAtual ? ingressoAtual.sala : '')
  const [assento, setAssento] = useState(ingressoAtual ? ingressoAtual.assento : '')
  const [tipo, setTipo] = useState(ingressoAtual ? ingressoAtual.tipo : 'Inteira')
  const [erro, setErro] = useState('')

  if (!ingressoAtual) {
    return (
      <div className="panel">
        <h2>Ingresso não encontrado</h2>
        <p style={{ marginBottom: '1rem', color: '#94a3b8' }}>
          O registro solicitado não existe ou já foi cancelado.
        </p>
        <button className="btn btn-secondary" onClick={() => navigate('/ingressos')}>
          <FaArrowLeft /> Voltar para Bilheteria
        </button>
      </div>
    )
  }

  const handleSalvar = (e) => {
    e.preventDefault()

    const assentoFormatado = assento.trim().toUpperCase()

    if (!cliente.trim() || !assentoFormatado) {
      setErro('O nome do cliente e o assento são obrigatórios.')
      return
    }

    const assentoConflito = ingressos.some(
      (item) =>
        item.id !== ingressoAtual.id &&
        item.sala === sala &&
        item.filme === filme &&
        item.assento.toUpperCase() === assentoFormatado
    )

    if (assentoConflito) {
      setErro(`O assento ${assentoFormatado} já está reservado por outro cliente nesta sessão.`)
      return
    }

    atualizarIngresso({
      ...ingressoAtual,
      cliente: cliente.trim(),
      filme,
      sala,
      assento: assentoFormatado,
      tipo,
      valor: tipo === 'Inteira' ? 36 : 18,
    })

    navigate('/ingressos')
  }

  return (
    <div>
      <h1>Editar Ingresso #{ingressoAtual.id}</h1>
      <p className="subtitle">Atualize os dados da reserva e salve as alterações.</p>

      <div className="panel">
        {erro && <div className="alert-error">{erro}</div>}

        <form onSubmit={handleSalvar}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome do Cliente</label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Filme</label>
              <select value={filme} onChange={(e) => setFilme(e.target.value)}>
                <option value="Duna: Parte Dois">Duna: Parte Dois</option>
                <option value="Divertida Mente 2">Divertida Mente 2</option>
                <option value="Deadpool & Wolverine">Deadpool & Wolverine</option>
                <option value="Ainda Estou Aqui">Ainda Estou Aqui</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sala</label>
              <select value={sala} onChange={(e) => setSala(e.target.value)}>
                <option value="Sala 1 - IMAX">Sala 1 - IMAX</option>
                <option value="Sala 2 - 3D">Sala 2 - 3D</option>
                <option value="Sala 3 - Padrão">Sala 3 - Padrão</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assento</label>
              <input
                type="text"
                maxLength={4}
                value={assento}
                onChange={(e) => setAssento(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tipo de Entrada</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Inteira">Inteira (R$ 36,00)</option>
                <option value="Meia">Meia (R$ 18,00)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              <FaSave /> Salvar Alterações
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/ingressos')}
            >
              <FaArrowLeft /> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DetalhesIngresso
