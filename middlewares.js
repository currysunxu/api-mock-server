'use strict'

const utils = require('./utils')

module.exports = {
  supportAuth: function(req, res, next) {

    if (req.method == 'POST' && req.url == ('/students')) {
      // Get username from request body
      var reqBody = utils.lowerJSONKey(req.body)
      var username = reqBody.username

      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/students/' + username
    }

    if (req.method == 'POST' && req.url == ('/phones')) {

      // Get phone number from request body
      var reqBody = utils.lowerJSONKey(req.body)
      var phoneNum = reqBody.phone


      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/phones/' + phoneNum
    }

    if (req.method == 'POST' && req.url == ('/registeredphones')) {

      // Get phone number from request body
      var reqBody = utils.lowerJSONKey(req.body)
      var phoneNum = reqBody.phone
      console.log(req.body)

      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/registeredphones/' + phoneNum
      console.log(req.url)
    }

    // Contiue to JSON server router
    next()
  }
}
