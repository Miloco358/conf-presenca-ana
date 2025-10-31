import React, { useState } from 'react'
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Home() {
  const [nome, setNome] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleConfirmar = async () => {
    if (!nome.trim()) {
      setStatus({ type: 'error', text: 'Por favor digite seu nome.' })
      return
    }

    setLoading(true)
    try {
      const convidadosRef = collection(db, 'convidados')
      await addDoc(convidadosRef, {
        nome: nome.trim(),
        criadoEm: serverTimestamp(),
      })
      setStatus({ type: 'success', text: 'Sua presença foi confirmada, obrigado!' })
      setNome('')
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', text: 'Ocorreu um erro ao confirmar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h1>Confirmação de Presença – Aniversário da Ana</h1>
      <p className="lead">Digite seu nome abaixo para confirmar sua presença.</p>

      <label htmlFor="nome">Seu nome</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />

      <button onClick={handleConfirmar} disabled={loading} className="btn">
        {loading ? 'Confirmando...' : 'Confirmar Presença'}
      </button>

      {status && (
        <p className={`status ${status.type === 'error' ? 'error' : 'success'}`}>
          {status.text}
        </p>
      )}

      <p className="small">Agradecemos — esperamos você na festa!</p>
    </div>
  )
}