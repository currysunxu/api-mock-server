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
      console.log(phoneNum)


      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/phones/' + phoneNum
    }

    // Contiue to JSON server router
    next()
  }
}
