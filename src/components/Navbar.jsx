import { Link } from 'react-router-dom'
import { FaFilm, FaHome, FaTicketAlt } from 'react-icons/fa'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <FaFilm />
        <span>CineTicket</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">
          <FaHome />
          <span>Início</span>
        </Link>
        <Link to="/ingressos">
          <FaTicketAlt />
          <span>Bilheteria</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
