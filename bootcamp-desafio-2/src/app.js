const express = require('express')
const cors = require('cors')

const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

function validateRepositoryId(request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).send({ error: 'Invalid repository ID.' })
  }

  return next()
}

app.use('/repositories/:id', validateRepositoryId)

app.get('/repositories', (request, response) => {
  return response.send(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.status(201).send(repository)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id)
  const repositoryFound = repositories.find((repo) => repo.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send({ error: 'Repository not found.' })
  }

  const repository = { id, title, url, techs, likes: repositoryFound.likes }

  repositories[repositoryIndex] = repository

  return response.send(repository)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id)
  const repository = repositories.find((repo) => repo.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send('Repository not found.')
  }

  const newLikes = repository.likes + 1

  const newRepository = {
    id: repository.id,
    title: repository.title,
    url: repository.url,
    techs: repository.techs,
    likes: newLikes,
  }

  repositories[repositoryIndex] = newRepository

  return response.send(newRepository)
})

module.exports = app
