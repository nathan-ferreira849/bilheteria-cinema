import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Ingressos from './pages/Ingressos'
import DetalhesIngresso from './pages/DetalhesIngresso'

function App() {
  const [ingressos, setIngressos] = useState([
    {
      id: 1,
      cliente: 'Lucas Andrade',
      filme: 'Duna: Parte Dois',
      sala: 'Sala 1 - IMAX',
      assento: 'E5',
      tipo: 'Inteira',
      valor: 36,
    },
    {
      id: 2,
      cliente: 'Mariana Costa',
      filme: 'Divertida Mente 2',
      sala: 'Sala 2 - 3D',
      assento: 'C8',
      tipo: 'Meia',
      valor: 18,
    },
  ])

  const adicionarIngresso = (novoIngresso) => {
    setIngressos([...ingressos, novoIngresso])
  }

  const atualizarIngresso = (ingressoAtualizado) => {
    setIngressos(
      ingressos.map((item) =>
        item.id === ingressoAtualizado.id ? { ...item, ...ingressoAtualizado } : item
      )
    )
  }

  const excluirIngresso = (id) => {
    setIngressos(ingressos.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home ingressos={ingressos} />} />
          <Route
            path="/ingressos"
            element={
              <Ingressos
                ingressos={ingressos}
                adicionarIngresso={adicionarIngresso}
                excluirIngresso={excluirIngresso}
              />
            }
          />
          <Route
            path="/ingresso/:id"
            element={
              <DetalhesIngresso
                ingressos={ingressos}
                atualizarIngresso={atualizarIngresso}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
