import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = 'anita2025' // senha simples embutida (mude para o que quiser)

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [senha, setSenha] = useState('')
  const [convidados, setConvidados] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!autenticado) return
    const q = query(collection(db, 'convidados'), orderBy('criadoEm', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      const items = []
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }))
      setConvidados(items)
      setLoading(false)
    }, (err) => {
      console.error(err)
      setLoading(false)
    })

    return () => unsub()
  }, [autenticado])

  const handleLogin = (e) => {
    e.preventDefault()
    if (senha === ADMIN_PASSWORD) {
      setAutenticado(true)
    } else {
      alert('Senha incorreta')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Deseja remover este convidado?')) return
    try {
      await deleteDoc(doc(db, 'convidados', id))
    } catch (err) {
      console.error(err)
      alert('Erro ao remover')
    }
  }

  if (!autenticado) {
    return (
      <div className="card">
        <h2>Área Administrativa</h2>
        <form onSubmit={handleLogin} className="form">
          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn">Entrar</button>
            <button type="button" className="btn ghost" onClick={() => navigate('/')}>Voltar</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Convidados confirmados</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {convidados.length === 0 ? (
            <p>Nenhuma confirmação ainda.</p>
          ) : (
            <ul className="lista">
              {convidados.map((c) => (
                <li key={c.id}>
                  <span>{c.nome}</span>
                  <button className="btn small ghost" onClick={() => handleDelete(c.id)}>Remover</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

    </div>
  )
}