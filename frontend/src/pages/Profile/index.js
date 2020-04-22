import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const [incidents, setIncidents] = useState([])

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  const history = useHistory()

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }

    }).then(response => {
      setIncidents(response.data)

    })

  }, [ongId]) // mesmo ongId não mudando pois seria necessario um outro Login é interessante colocar

  // id do incident!
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      // fazer o incident apagar em tempo real da nossa interface. Vamos fazer uma varredura no nosso array deincidents, procura o deletado pelo id e remover ele de dentro
      setIncidents(incidents.filter(incident => incident.id !== id))

    } catch (err) {
      alert('Erro ao deletar caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (

    // ANOTAÇÂO: NÂO FAZER onClick={handleDeleteIncident(incidents.id)} pois assim não estamos estamos passando a função como parâmetro para o onClick e sim vai EXECUTAR a função e passar o retorno dela como parâmetro para o onClick DELETANDO ASSIM TODOS OS INCIDENTS quando o componente for exibido em tela! A FORMA CORRETA é onClick={() => handleDeleteIncident(incidents.id)}

    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        
        {incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="a8a8b3" />
              </button>
            </li>
          ))}

      </ul>
    </div >
  )
}