'use strict'

const customMiddlewares = require('./middlewares')

const jsonServer = require('json-server')
const server = jsonServer.create()

// Set re-write rules
const rules = require('./routes')
server.use(jsonServer.rewriter(rules))

// Set body parser to support post request body
server.use(jsonServer.bodyParser);

// Convert POST /customer to GET /customer/:id
server.use(customMiddlewares.supportAuth)

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults()
server.use(middlewares)

// Add healthcheck path
server.get('/omni/apigateway/health', (req, res) => {
  res.status(200).jsonp('ok')
})

// Set mock data source
const dbGen = require('./data')
const router = jsonServer.router(dbGen())
server.use(router)

// Only response the data field.
router.render = function(req, res) {
  res.jsonp(res.locals.data.data)
}

// Start server
const port = process.env.PORT || 80
server.listen(port, () => {
  console.log('JSON Server is running on port ' + port)
})
