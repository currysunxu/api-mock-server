'use strict'

const customMiddlewares = require('./middlewares')

const jsonServer = require('json-server')
const server = jsonServer.create()

// Set re-write rules
const rules = require('./routes')
server.use(jsonServer.rewriter(rules))

server.use(jsonServer.bodyParser);

// Convert POST /customer to GET /customer/:id
server.use(customMiddlewares.supportAuth)

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults()
server.use(middlewares)

// Set mock data source
const dbGen = require('./data')
const router = jsonServer.router(dbGen())
server.use(router)

// Only response the data field.
router.render = function(req, res) {
  res.jsonp(res.locals.data.data)
}

// Start server
server.listen(3000, () => {
  console.log('JSON Server is running')
})
