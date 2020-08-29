import React, { useState, useEffect } from 'react'

import './styles.css'
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  const fetchRepositories = async () => {}

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const now = new Date()
    const newRepository = {
      title: `Novo repo ${now.getTime()}`,
      url: '',
      techs: ['React'],
    }

    const response = await api.post('repositories', newRepository)
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const newRepositories = repositories.filter((repo) => repo.id !== id)

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
