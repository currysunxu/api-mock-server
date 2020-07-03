'use strict'

const utils = require('./utils')
const jwt_decode = require('jwt-decode');

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

      // Replace req.method to GET and req.url
      req.method = 'GET'
      req.url = '/registeredphones/' + phoneNum
      console.log(req.url)
    }

    // Get omni user group sessions
    if (req.method == 'GET' && req.url == ('/groupsessions')) {
      // console.log("headers = " + JSON.stringify(req.headers))
      var idToken = req.headers['x-ef-token']
      var userInfo = jwt_decode(idToken);
      // Replace req.method to GET and req.url
      req.url = '/groupsessions/' + userInfo.sub
      console.log(req.url)
    }

    // Continue to JSON server router
    next()
  }
}
