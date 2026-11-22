import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Pedidos from './pages/pedidos.jsx'
import Cardapio from './pages/cardapio.jsx'

export function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/cardapio" element={<Cardapio />} />
    </Routes>
  )
}