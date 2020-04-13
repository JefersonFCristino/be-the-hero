const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router() // desaclopando o módulo de rotas do express em uma nova variável

/**
 * Rota de Login (criar um sessão)
*/
routes.post('/sessions', SessionController.create)

/**
 * Criação e listagem de ONGs 
*/
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

/**
 * Casos especificos da ONG
*/
routes.get('/profile', ProfileController.index)

/**
 * Cadastro e listagem de casos(incidents) das ONGs
*/
routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;
