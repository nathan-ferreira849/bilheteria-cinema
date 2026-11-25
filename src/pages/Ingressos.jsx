import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlusCircle, FaSearch, FaEdit, FaTrash, FaTicketAlt } from 'react-icons/fa'

function Ingressos({ ingressos, adicionarIngresso, excluirIngresso }) {
  const navigate = useNavigate()

  const [cliente, setCliente] = useState('')
  const [filme, setFilme] = useState('Duna: Parte Dois')
  const [sala, setSala] = useState('Sala 1 - IMAX')
  const [assento, setAssento] = useState('')
  const [tipo, setTipo] = useState('Inteira')
  const [erro, setErro] = useState('')

  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('Todos')

  const handleSubmit = (e) => {
    e.preventDefault()

    const assentoFormatado = assento.trim().toUpperCase()

    if (!cliente.trim() || !assentoFormatado) {
      setErro('Preencha o nome do cliente e o código do assento.')
      return
    }

    const assentoOcupado = ingressos.some(
      (item) =>
        item.sala === sala &&
        item.filme === filme &&
        item.assento.toUpperCase() === assentoFormatado
    )

    if (assentoOcupado) {
      setErro(`O assento ${assentoFormatado} já está ocupado nesta sessão!`)
      return
    }

    const novoIngresso = {
      id: Date.now(),
      cliente: cliente.trim(),
      filme,
      sala,
      assento: assentoFormatado,
      tipo,
      valor: tipo === 'Inteira' ? 36 : 18,
    }

    adicionarIngresso(novoIngresso)
    setCliente('')
    setAssento('')
    setErro('')
  }

  const ingressosFiltrados = ingressos.filter((item) => {
    const bateBusca =
      item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      item.filme.toLowerCase().includes(busca.toLowerCase())
    const bateTipo = filtroTipo === 'Todos' || item.tipo === filtroTipo
    return bateBusca && bateTipo
  })

  return (
    <div>
      <h1>Guichê de Bilheteria</h1>
      <p className="subtitle">Emita novos ingressos e gerencie as reservas ativas.</p>

      <section className="panel">
        <h2>
          <FaPlusCircle /> Emitir Novo Ingresso
        </h2>

        {erro && <div className="alert-error">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome do Cliente</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
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
                placeholder="Ex: D4"
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

          <button type="submit" className="btn btn-primary">
            <FaTicketAlt /> Confirmar Venda
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>
          <FaSearch /> Ingressos Vendidos ({ingressosFiltrados.length})
        </h2>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Buscar por nome do cliente ou filme..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="Todos">Todos os tipos</option>
            <option value="Inteira">Somente Inteira</option>
            <option value="Meia">Somente Meia</option>
          </select>
        </div>

        {ingressosFiltrados.length === 0 ? (
          <p className="empty-state">Nenhum ingresso encontrado para o filtro atual.</p>
        ) : (
          <div className="tickets-list">
            {ingressosFiltrados.map((item) => (
              <div key={item.id} className="ticket-card">
                <div>
                  <div className="ticket-header">
                    <h3>{item.filme}</h3>
                    <span className="badge">{item.tipo}</span>
                  </div>
                  <div className="ticket-info" style={{ marginTop: '0.8rem' }}>
                    <p>
                      <strong>Cliente:</strong> {item.cliente}
                    </p>
                    <p>
                      <strong>Local:</strong> {item.sala} — Assento <strong>{item.assento}</strong>
                    </p>
                    <p>
                      <strong>Valor Pago:</strong> R$ {Number(item.valor).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="ticket-actions">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => navigate(`/ingresso/${item.id}`)}
                  >
                    <FaEdit /> Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => excluirIngresso(item.id)}
                  >
                    <FaTrash /> Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Ingressos
