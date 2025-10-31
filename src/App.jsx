import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Admin from './Admin'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">Aniversário da Ana</Link>
        <nav>
          <Link to="/admin" className="nav-link">Área Admin</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="footer">Feito com carinho · Confirmação de presença</footer>
    </div>
  )
}