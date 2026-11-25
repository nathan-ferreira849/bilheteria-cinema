import { Link } from 'react-router-dom'
import { FaTicketAlt, FaMoneyBillWave, FaUserGraduate, FaArrowRight } from 'react-icons/fa'

function Home({ ingressos }) {
  const totalVendidos = ingressos.length
  const faturamentoTotal = ingressos.reduce((soma, item) => soma + Number(item.valor), 0)
  const totalMeias = ingressos.filter((item) => item.tipo === 'Meia').length

  return (
    <div>
      <h1>Painel da Bilheteria</h1>
      <p className="subtitle">Acompanhe o resumo de vendas e acesse o guichê de atendimento.</p>

      <div className="cards-grid">
        <div className="stat-card">
          <span>
            <FaTicketAlt /> Ingressos Emitidos
          </span>
          <strong>{totalVendidos}</strong>
        </div>

        <div className="stat-card">
          <span>
            <FaMoneyBillWave /> Faturamento Total
          </span>
          <strong>R$ {faturamentoTotal.toFixed(2)}</strong>
        </div>

        <div className="stat-card">
          <span>
            <FaUserGraduate /> Meias-Entradas
          </span>
          <strong>{totalMeias}</strong>
        </div>
      </div>

      <div className="panel">
        <h2>Acesso Rápido</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '1.2rem' }}>
          Emita novos ingressos, consulte assentos ocupados por sala ou edite reservas existentes.
        </p>
        <Link to="/ingressos" className="btn btn-primary">
          <span>Ir para o Guichê de Vendas</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default Home
