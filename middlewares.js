'use strict'

const utils = require('./utils')

module.exports = {
  supportAuth: function(req, res, next) {
    if (req.method == 'POST' && req.url == ('/accounts')) {
      // Get username from request body
      var reqBody = utils.lowerJSONKey(req.body)
      var username = reqBody.username

      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/accounts/' + username
    }
    // Contiue to JSON server router
    next()
  }
}
