'use strict'

const utils = require('./utils')

module.exports = {
  supportAuth: function(req, res, next) {
    if (req.method == 'POST' && req.url == ('/customers')) {
      // Get username from request body
      var reqBody = utils.lowerJSONKey(req.body)
      var username = reqBody.username

      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/customers/' + username
    }
    // Contiue to JSON server router
    next()
  }
}
