
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', function getInfo (req) { 
  if (req.method === "POST") {
  return JSON.stringify(req.body) 
  }
})

const tiny = (tokens, req, res) => {
  return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res),
  ].join(' ')
}

app.use(express.json()) 
app.use(morgan(tiny))
app.use(cors())

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(note => note.id === id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.json(persons)
  response.status(204).end()
})


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  } else if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  } else if (persons.map(x=>x.name).includes(body.name)) {
    return response.status(400).json({ 
      error: 'name already in the list' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.random()*10000,
  }

  persons = persons.concat(person)
  response.json(person)
})

app.get('/info', (req, res) => {
  res.send(`
    <div>
    <p>phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})